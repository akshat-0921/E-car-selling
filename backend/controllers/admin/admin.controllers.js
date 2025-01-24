import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../../models/admin.models.js';
import { PasswordReset } from '../../models/passwordReset.models.js';
import { mailSender } from '../../utils/mailSender.utils.js';
import { errorHandler } from '../../utils/errorHandler.utils.js';

const generateTokens = async (admin) => {
    const accessToken = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "15m" }); // Short-lived
    const refreshToken = jwt.sign({ adminId: admin._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" }); // Long-lived

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return errorHandler(res, 404, "Admin not found");
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return errorHandler(res, 400, "Invalid password");
        }

        const { accessToken, refreshToken } = await generateTokens(admin);

        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }) // 15 minutes
            .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) // 7 days
            .json({
                success: true,
                message: "Login successful",
                accessToken,
                refreshToken,
            });
    } catch (error) {
        return errorHandler(res, 500, "Error during login");
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.headers["authorization"]?.replace("Bearer ", "");

        if (!incomingRefreshToken) {
            return errorHandler(res, 401, "Unauthorized request");
        }

        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const admin = await Admin.findById(decoded.adminId);

        if (!admin || admin.refreshToken !== incomingRefreshToken) {
            return errorHandler(res, 401, "Invalid or expired refresh token");
        }

        const { accessToken, refreshToken } = await generateTokens(admin);

        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }) // 15 minutes
            .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) // 7 days
            .json({
                success: true,
                accessToken,
                refreshToken,
                message: "Access token refreshed successfully",
            });
    } catch (error) {
        return errorHandler(res, 500, "Failed to refresh access token");
    }
};

const adminLogout = async (req, res) => {
    try {
        const adminId = req.adminId;
        const admin = await Admin.findByIdAndUpdate(adminId, { refreshToken: null }, { new: true });

        if (!admin) {
            return errorHandler(res, 404, "Admin not found");
        }

        return res
            .status(200)
            .clearCookie("accessToken", { httpOnly: true })
            .clearCookie("refreshToken", { httpOnly: true })
            .json({ success: true, message: "Admin logged out successfully" });
    } catch (error) {
        return errorHandler(res, 500, "Error during logout");
    }
};

const viewProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId);

        if (!admin) {
            return errorHandler(res, 404, "Admin not found");
        }

        return res.status(200).json({
            success: true,
            profile: { email: admin.email, createdAt: admin.createdAt },
        });
    } catch (error) {
        return errorHandler(res, 500, "Error fetching profile");
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const admin = await Admin.findById(req.adminId);

        if (!admin) {
            return errorHandler(res, 404, "Admin not found");
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);

        if (!isPasswordValid) {
            return errorHandler(res, 400, "Old password is incorrect");
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();

        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        return errorHandler(res, 500, "Error changing password");
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return errorHandler(res, 404, "Admin not found");
        }

        const resetToken = jwt.sign({ adminId: admin._id }, process.env.RESET_TOKEN_SECRET, { expiresIn: "1h" });

        await PasswordReset.create({
            adminId: admin._id,
            token: resetToken,
        });

        await mailSender(admin.email, "Password Reset", `Your reset token is: ${resetToken}`);

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        });
    } catch (error) {
        return errorHandler(res, 500, "Error sending password reset email");
    }
};

const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
        const passwordReset = await PasswordReset.findOne({ token: resetToken });

        if (!passwordReset || passwordReset.adminId.toString() !== decoded.adminId) {
            return errorHandler(res, 400, "Invalid or expired reset token");
        }

        const admin = await Admin.findById(decoded.adminId);

        if (!admin) {
            return errorHandler(res, 404, "Admin not found");
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();
        await PasswordReset.findByIdAndDelete(passwordReset._id);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        return errorHandler(res, 500, "Error resetting password");
    }
};

const verifyAccessToken = (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
        return errorHandler(res, 401, "Unauthorized request");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        return errorHandler(res, 401, "Invalid or expired access token");
    }
};

export {
    adminLogin,
    refreshAccessToken,
    adminLogout,
    viewProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyAccessToken,
};

