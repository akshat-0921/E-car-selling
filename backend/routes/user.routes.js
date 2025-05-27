import express from "express";
import {
   registerUser,
   loginUser,
   sendOtp,
   logoutUser,
   refreshAccessToken,
   changePassword,
   forgotPassword,
   resetPassword,
   updateProfile,
   getCurrentUser
} from "../controllers/user/user.controllers.js";
import { userAuth } from "../middlewares/auth/userAuth.middleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", userAuth, logoutUser);
router.put("/update", userAuth, updateProfile)
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get("/me", userAuth, getCurrentUser)

export default router;