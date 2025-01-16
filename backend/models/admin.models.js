import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const AdminSchema = mongoose.Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/]
   },
   phoneNumber: {
      type: String,
      required: true,
      match: [/^\+?[0-9\s-]{7,15}$/]
   },
   password: {
      type: String,
      required: true,
      min: 8
   },
   refreshToken: {
      type: String,
      default: Null
   }
}, { timestamps: true })


AdminSchema.methods.createAccessToken = function () {
   jwt.sign(
      {
         _id: this._id,
         email: this._email
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60m' }
   )
}


AdminSchema.methods.createRefreshToken = function () {
   jwt.sign(
      { _id: this._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
   )
}

export const Admin = mongoose.model("Admin", AdminSchema)
