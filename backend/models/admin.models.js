import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const AdminSchema = new mongoose.Schema(
   {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, "Invalid email format"] },
      phoneNumber: { type: String, required: true, match: [/^\+?[0-9\s-]{7,15}$/, "Invalid phone number format"] },
      password: { type: String, required: true, minlength: 8 },
      refreshToken: { type: String, default: null },
   },
   { timestamps: true }
);

AdminSchema.methods.createAccessToken = function () {
   return jwt.sign(
      { _id: this._id, email: this.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
   );
};

AdminSchema.methods.createRefreshToken = function () {
   return jwt.sign(
      { _id: this._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
   );
};

AdminSchema.statics.verifyRefreshToken = function (token) {
   try {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
   } catch (error) {
      throw new Error("Invalid or expired refresh token");
   }
};

export const Admin = mongoose.model("Admin", AdminSchema);
