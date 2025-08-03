import express from "express";
import {
    createPaymentIntent,
    verifyRazorpaySignature,
} from "../controllers/payment/payment.controllers.js";

const router = express.Router();

router.post("/create-payment", createPaymentIntent);
router.post("/verify-razorpay", verifyRazorpaySignature);

export default router;
