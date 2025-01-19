import mongoose, { Schema } from "mongoose";

const ReviewSchema = Schema({
   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
   vehicle: { type: Schema.Types.ObjectId, ref: "Car", required: true },
   showroom: { type: Schema.Types.ObjectId, ref: "Showroom", required: true },
   website: { type: Boolean, default: false },
   rating: { type: Number, required: true },
   review: { type: String },
   date: { type: String, default: Date.now() }
}, { timestamps: true })

export const Review = mongoose.model("Review", ReviewSchema)
