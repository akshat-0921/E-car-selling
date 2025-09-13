//17-01-2025

import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { otpTemplate } from "../../utils/emailTemplate.js";
import { User } from "../../models/user.models.js";
import { OTP } from "../../models/otp.models.js";
import { PasswordReset } from '../../models/passwordReset.models.js';
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

      let role = "user";
      if (email === process.env.Mail_USER) {
         role = "admin";
      }

      if (role === "user") {
         const latestOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

         if (latestOtp.length === 0 || otp !== latestOtp[0].otp) {
            return errorHandler(res, 401, "Invalid or expired OTP");
         }
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
         firstName,
         lastName,
         email,
         password: hashedPassword,
         phoneNumber,
         address,
         role
      });

      if (role === "user") {
         await OTP.deleteMany({ email });
      }

      return res.status(201).json({
         success: true,
         user: { id: newUser._id, firstName, lastName, email, address, role },
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

      // Only send required fields — nothing extra
      const userSafe = {
         id: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         phoneNumber: user.phoneNumber,
         address: user.address || "",
      };

      return res
         .status(200)
         .cookie("accessToken", accessToken, { httpOnly: true })
         .cookie("refreshToken", refreshToken, { httpOnly: true })
         .json({
            success: true,
            user: userSafe,
            accessToken,
            message: "User logged in",
         });
   } catch (error) {
      return errorHandler(res, 500, "Cannot log in. Please try again later.");
   }
};

const getCurrentUser = (req, res) => {
   try {
      if (!req.user) {
         return res.status(401).json({ success: false, msg: "Not authenticated" })
      }

      const userSafe = {
         firstName: req.user.firstName,
         lastName: req.user.lastName,
         email: req.user.email,
         phoneNumber: req.user.phoneNumber,
         address: req.user.address || "",
      }
      return res.status(200).json({ success: true, user: userSafe })
   } catch (error) {
      return res.status(500).json({ success: false, msg: "Failed to fetch user details" })
   }
}

// const loginUser = async (req, res) => {
//    try {
//       const { email, password } = req.body;

//       if (!email || !password) {
//          return errorHandler(res, 400, "Email and password are required");
//       }

//       const user = await User.findOne({ email });

//       if (!user || !(await bcrypt.compare(password, user.password))) {
//          return errorHandler(res, 401, "Invalid email or password");
//       }

//       const { accessToken, refreshToken } = await generateTokens(user);

//       return res
//          .status(200)
//          .cookie("accessToken", accessToken, { httpOnly: true })
//          .cookie("refreshToken", refreshToken, { httpOnly: true })
//          .json({
//             success: true,
//             // user: { id: user._id, email: user.email, role: user.role, address: user.address },
//             user: { user },
//             accessToken,
//             refreshToken,
//             message: "User logged in",
//          });
//    } catch (error) {
//       return errorHandler(res, 500, "Cannot log in. Please try again later.");
//    }
// };

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


const updateProfile = async (req, res) => {
   try {
      const userId = req.user._id;
      const { firstName, lastName, email, phone } = req.body;

      // Check if at least one field is provided
      if (!firstName && !lastName && !email && !phone) {
         return res.status(400).json({
            success: false,
            msg: "At least one field (firstName, lastName, email, or phone) is required to update profile",
         });
      }

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, msg: "User not found" });

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (phone) user.phone = phone;

      await user.save();

      return res.status(200).json({
         success: true,
         msg: "Profile updated successfully",
         user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            address: user.address
         },
      });
   } catch (error) {
      console.error("Profile update error:", error);
      return res.status(500).json({ success: false, msg: "Internal server error" });
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

const forgotPassword = async (req, res) => {
   try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
         return errorHandler(res, 404, "User not found");
      }

      const resetToken = jwt.sign({ email: user.email }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });

      await PasswordReset.create({ email: user.email, token: resetToken });
      const resetLink = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

      try {
         await mailSender(user.email, "Password Reset", `Click here to reset your password: ${resetLink}`);
      } catch (emailError) {
         return errorHandler(res, 500, "Failed to send password reset email. Please try again.");
      }

      return res.status(200).json({ success: true, message: "Password reset email sent" });
   } catch (error) {
      return errorHandler(res, 500, "Error occurred while processing the request.");
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

      await User.updateOne({ email: decoded.email }, { password: hashedPassword });
      await PasswordReset.deleteOne({ token });

      return res.status(200).json({ success: true, message: "Password has been reset successfully" });
   } catch (error) {
      return errorHandler(res, 500, "Error occurred while resetting the password.");
   }
};

export {
   registerUser,
   loginUser,
   sendOtp,
   logoutUser,
   refreshAccessToken,
   changePassword,
   forgotPassword,
   resetPassword,
   updateProfile,
   getCurrentUser,
};
