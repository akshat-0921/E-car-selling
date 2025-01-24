import express from "express";
import {
    adminLogin,
    refreshAccessToken,
    adminLogout,
    viewProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyAccessToken,
} from "../controllers/admin/admin.controllers.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyAccessToken, adminLogout);

router.get("/profile", verifyAccessToken, viewProfile);
router.post("/change-password", verifyAccessToken, changePassword);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
