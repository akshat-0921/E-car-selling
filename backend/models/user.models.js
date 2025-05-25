import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   email: { type: String, required: true, trim: true, match: [/.+\@.+\..+/] },
   password: { type: String, required: true, minlength: 8, trim: true },
   phoneNumber: { type: String, required: true, match: [/^\+?[0-9\s-]{7,15}$/] },
   address: { type: String },
   cartDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
   order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
   role: { type: String, enum: ['user', 'admin'], default: 'user' },
   refreshToken: { type: String, default: null },
}, { timestamps: true });

userSchema.methods.createAccessToken = function () {
   return jwt.sign({ _id: this._id, username: this.username, email: this.email }, process.env.ACCESS_TOKEN_SECRET,
      //  { expiresIn: '60m' }
   );
};

userSchema.methods.createRefreshToken = function () {
   return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET,
      //  { expiresIn: '7d' }
   );
};

export const User = mongoose.model("User", userSchema);
