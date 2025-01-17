//17-01-2025

import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { otpTemplate } from "../../utils/emailTemplate.js";
import { User } from "../../models/user.models.js";
import { OTP } from "../../models/otp.models.js";
import { mailSender } from "../../utils/mailSender.utils.js";
import { errorHandler } from "../../utils/errorHandler.utils.js";

const generateTokens = async (user) => {
    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
};

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string().pattern(/^\+?[0-9\s-]{7,15}$/).required(),
    address: Joi.string().optional(),
    otp: Joi.string().length(6).required(),
});

const sendOtp = async (req, res) => {
    console.log("sendOtp route hit");
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return errorHandler(res, 400, "User is already registered, cannot send OTP");
        }

        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        while (await OTP.findOne({ otp })) {
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            });
        }

        const code = await OTP.create({ otp, email });

        try {
            await mailSender(email, "Verification Email", otpTemplate(otp));
        } catch (emailError) {
            await OTP.deleteOne({ _id: code._id });
            return errorHandler(res, 500, "Failed to send OTP email. Please try again.");
        }

        return res.status(201).json({ success: true, msg: "OTP sent", code });
    } catch (error) {
        return errorHandler(res, 500, "Error sending OTP. Please try again later.");
    }
};

const registerUser = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return errorHandler(res, 400, error.details[0].message);
        }

        const { firstName, lastName, email, password, phoneNumber, address, otp } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return errorHandler(res, 400, "User is already registered");
        }

        const latestOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (latestOtp.length === 0 || otp !== latestOtp[0].otp) {
            return errorHandler(res, 401, "Invalid or expired OTP");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
        });

        await OTP.deleteMany({ email });

        return res.status(201).json({
            success: true,
            user: { id: newUser._id, firstName, lastName, email, address },
            message: "Account has been created",
        });
    } catch (error) {
        return errorHandler(res, 500, "User cannot be registered. Please try again later.");
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return errorHandler(res, 400, "Email and password are required");
        }

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return errorHandler(res, 401, "Invalid email or password");
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .json({
                success: true,
                user: { id: user._id, email: user.email, role: user.role, address: user.address },
                message: "User logged in",
            });
    } catch (error) {
        return errorHandler(res, 500, "Cannot log in. Please try again later.");
    }
};

const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { refreshToken: null }, { new: true });

        return res
            .status(200)
            .clearCookie("accessToken", { httpOnly: true })
            .clearCookie("refreshToken", { httpOnly: true })
            .json({ success: true, message: "User logged out" });
    } catch (error) {
        return errorHandler(res, 500, "Cannot log out. Please try again later.");
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!incomingRefreshToken) {
            return errorHandler(res, 401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return errorHandler(res, 401, "Invalid or expired refresh token");
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true })
            .json({
                success: true,
                accessToken,
                refreshToken,
                message: "Tokens refreshed successfully",
            });
    } catch (error) {
        return errorHandler(res, 500, "Failed to refresh tokens. Please try again later.");
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!(oldPassword && newPassword && confirmPassword)) {
            return errorHandler(res, 400, "All fields are required");
        }

        const user = await User.findById(req.user._id);

        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            return errorHandler(res, 401, "Incorrect old password");
        }

        if (newPassword !== confirmPassword) {
            return errorHandler(res, 400, "Passwords do not match");
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        return errorHandler(res, 500, "Failed to change password. Please try again later.");
    }
};

export {
    registerUser,
    loginUser,
    sendOtp,
    logoutUser,
    refreshAccessToken,
    changePassword,
};
