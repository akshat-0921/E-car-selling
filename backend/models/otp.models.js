import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        otp: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 300, // OTP expires after 5 minutes (300 seconds)
        },
    },
    { timestamps: true }
);

export const OTP = mongoose.model("OTP", otpSchema);