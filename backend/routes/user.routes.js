import express from "express";
import {
    registerUser,
    loginUser,
    sendOtp,
    logoutUser,
    refreshAccessToken,
    changePassword,
} from "../controllers/user/user.controllers.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", changePassword);

export default router;