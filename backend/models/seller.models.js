import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const SellerSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true, match: [/.+\@.+\..+/] },
   password: { type: String, required: true },
   phoneNumber: { type: String, required: true, match: [/^\+?[0-9\s-]{7,15}$/] },
   refreshToken: { type: String, default: null },
}, { timestamps: true });

SellerSchema.methods.createAccessToken = function () {
   return jwt.sign({ _id: this._id, email: this.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
};

SellerSchema.methods.createRefreshToken = function () {
   return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const Seller = mongoose.model("Seller", SellerSchema);
