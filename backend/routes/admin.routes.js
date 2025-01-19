import express from 'express';
import { adminLogin, changePassword, viewProfile, forgotPassword, resetPassword } from '../controllers/admin/admin.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('/change-password', authMiddleware, changePassword);
router.get('/profile', authMiddleware, viewProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
