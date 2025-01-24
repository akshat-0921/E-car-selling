import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Admin } from '../../models/admin.models.js';
import { OTP } from '../../models/otp.models.js';
import { PasswordReset } from '../../models/passwordReset.models.js';
import { mailSender } from '../../utils/mailSender.utils.js';
import { errorHandler } from '../../utils/errorHandler.utils.js';

const adminSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, secret, password, otp } = req.body

        const userExists = await User.exists({ email })
        if (userExists) { return res.status(400).json({ success: false, msg: 'User already exists' }) }

        const eixstingOtp = await OTP.findOne({ otp }).sort({ createdAt: -1 })
        await OTP.findOneAndDelete({ _id: eixstingOtp._id })

        if (secret !== env.ADMIN_PASSWORD) { return res.status(400).json({ success: false, msg: 'Invalid secret' }) }

        if (otp != eixstingOtp.otp) { return res.status(404).json({ success: false, msg: 'Invalid OTP' }) }

        const hashedPassword = await bcrypt.hash(password, 10)

        const admin = await Admin.create({ firstName, lastName, email, phoneNumber, password: hashedPassword })
        const adminData = await Admin.findById(admin._id).select('-password')

        await OTP.deleteMany({ email })

        return res.status(201).json({ success: true, adminData, msg: 'admin created' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, msg: 'An error occured while signing up' })
    }
}

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
        const adminToken = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

        const options = {
            httpOnly: true,
            secure: false
            // secure: true,
            // secure: process.env.NODE_ENV === "production",
        }

        return res
            .status(200)
            .cookie("adminToken", adminToken, options)

            .cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 }) // 15 minutes
            .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) // 7 days
            .json({
                success: true,
                message: "Login successful",
                accessToken,
                refreshToken: adminToken,
            });
    } catch (error) {
        return errorHandler(res, 500, "Error during login");
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return errorHandler(res, 400, "Passwords do not match");
        }

        const adminId = req.adminId;
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return errorHandler(res, 404, "Admin not found");
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);

        if (!isPasswordValid) {
            return errorHandler(res, 400, "Current password is incorrect");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        return errorHandler(res, 500, "Error changing password");
    }
};

const viewProfile = async (req, res) => {
    try {
        const adminId = req.adminId;
        const admin = await Admin.findById(adminId);

        if (!admin) {
            return errorHandler(res, 404, "Admin not found");
        }

        return res.status(200).json({
            success: true,
            profile: {
                email: admin.email,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            },
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

        const resetToken = jwt.sign({ email: admin.email }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });
        await PasswordReset.create({ email: admin.email, token: resetToken });
        const resetLink = `http://localhost:4000/api/admin/reset-password/${resetToken}`;

        try {
            await mailSender(admin.email, "Password Reset", `Click here to reset your password: ${resetLink}`);
        } catch (emailError) {
            return errorHandler(res, 500, "Failed to send password reset email.");
        }

        return res.status(200).json({
            success: true,
            message: "Password reset email sent",
        });
    } catch (error) {
        return errorHandler(res, 500, "Error initiating password reset");
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

        if (!decoded) {
            return errorHandler(res, 400, "Invalid or expired token");
        }

        const resetRequest = await PasswordReset.findOne({ token });

        if (!resetRequest) {
            return errorHandler(res, 400, "Reset token not found");
        }

        if (password !== confirmPassword) {
            return errorHandler(res, 400, "Passwords do not match");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.updateOne({ email: decoded.email }, { password: hashedPassword });
        await PasswordReset.deleteOne({ token });

        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
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
    changePassword,
    viewProfile,
    forgotPassword,
    resetPassword
};

