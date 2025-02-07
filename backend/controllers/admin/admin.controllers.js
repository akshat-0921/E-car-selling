import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../../models/admin.models.js";
import { OTP } from "../../models/otp.models.js";
import { PasswordReset } from "../../models/passwordReset.models.js";
import { mailSender } from "../../utils/mailSender.utils.js";
import { errorHandler } from "../../utils/errorHandler.utils.js";

const generateTokens = async (admin) => {
   const accessToken = jwt.sign(
      { adminId: admin._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // Short-lived token
   );
   const refreshToken = jwt.sign(
      { adminId: admin._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" } // Long-lived token
   );

   admin.refreshToken = refreshToken;
   await admin.save({ validateBeforeSave: false });

   return { accessToken, refreshToken };
};

const adminSignUp = async (req, res) => {
   try {
      const { firstName, lastName, email, phoneNumber, secret, password, otp } = req.body;

      const adminExists = await Admin.exists({ email });
      if (adminExists) {
         return errorHandler(res, 400, "Admin already exists");
      }

      const existingOtp = await OTP.findOne({ otp }).sort({ createdAt: -1 });
      if (!existingOtp) {
         return errorHandler(res, 400, "Invalid or expired OTP");
      }

      if (secret !== process.env.ADMIN_PASSWORD) {
         return errorHandler(res, 400, "Invalid secret");
      }

      if (otp !== existingOtp.otp) {
         return errorHandler(res, 400, "Incorrect OTP");
      }

      await OTP.deleteOne({ _id: existingOtp._id });

      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await Admin.create({
         firstName,
         lastName,
         email,
         phoneNumber,
         password: hashedPassword,
      });

      const { accessToken, refreshToken } = await generateTokens(admin);

      return res.status(201).json({
         success: true,
         admin: { firstName, lastName, email, phoneNumber },
         tokens: { accessToken, refreshToken },
         message: "Admin created successfully",
      });
   } catch (error) {
      return errorHandler(res, 500, "Error creating admin");
   }
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

      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

      return res.status(200).json({
         success: true,
         message: "Login successful",
         tokens: { accessToken, refreshToken },
      });
   } catch (error) {
      return errorHandler(res, 500, "Error during login");
   }
};

const viewProfile = async (req, res) => {
   try {
      const admin = await Admin.findById(req.adminId).select("-password");

      if (!admin) {
         return errorHandler(res, 404, "Admin not found");
      }

      return res.status(200).json({
         success: true,
         profile: admin,
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

      const resetToken = jwt.sign({ email }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "1h" });
      await PasswordReset.create({ email, token: resetToken });

      const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      await mailSender(email, "Password Reset", `Click here to reset your password: ${resetLink}`);

      return res.status(200).json({ success: true, message: "Password reset email sent" });
   } catch (error) {
      return errorHandler(res, 500, "Error initiating password reset");
   }
};

const resetPassword = async (req, res) => {
   try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
         return errorHandler(res, 400, "Passwords do not match");
      }

      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
      const resetRequest = await PasswordReset.findOne({ token });

      if (!decoded || !resetRequest) {
         return errorHandler(res, 400, "Invalid or expired token");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.updateOne({ email: decoded.email }, { password: hashedPassword });
      await PasswordReset.deleteOne({ token });

      return res.status(200).json({ success: true, message: "Password reset successfully" });
   } catch (error) {
      return errorHandler(res, 500, "Error resetting password");
   }
};

const verifyAccessToken = (req, res, next) => {
   const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

   if (!token) {
      return errorHandler(res, 401, "Unauthorized");
   }

   try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.adminId = decoded.adminId;
      next();
   } catch (error) {
      return errorHandler(res, 401, "Invalid or expired token");
   }
};

const adminLogout = async (req, res) => {
   try {
      const adminId = req.adminId
      await Admin.findByIdAndUpdate(adminId, { refreshToken: null }, { new: true })

      return res.status(200)
         .clearCookie("accessToken", { httpOnly: true })
         .clearCookie("refreshToken", { httpOnly: true })
         .json({ success: true, msg: "Admin logged out successfully" })
   } catch (error) {
      return res.status(500).json({ success: false, msg: "An error occurred while logging out. Please try again later" })
   }
}

const refreshAccessToken = async (req, res) => {
   try {
      const incomingRefreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer", "");

      if (!incomingRefreshToken) {
         return res.status(401).json({ success: false, msg: "Unauthorized request" })
      }

      const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
      const admin = await User.findById(decodedToken?._id)

      if (!admin) {
         return res.status(404).json({ success: false, msg: "Invalid or expired refresh token" })
      }

      const { accessToken, refreshToken } = await generateTokens(admin)

      return res.status(200)
         .cookie("accessToken", accessToken, { httpOnly: true })
         .cookie("refreshToken", refreshToken, { httpOnly: true })
         .json({
            success: true,
            accessToken,
            refreshToken,
            msg: "Tokens refreshed successfully"
         })
   } catch (error) {
      return res.status(500).json({ success: false, msg: "Failed to refresh tokens." })
   }
}

export {
   adminSignUp,
   adminLogin,
   changePassword,
   viewProfile,
   forgotPassword,
   resetPassword,
   verifyAccessToken,
   adminLogout,
   refreshAccessToken
};
