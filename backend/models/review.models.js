import mongoose, { Schema } from "mongoose";

const ReviewSchema = Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
   showroomId: { type: Schema.Types.ObjectId, ref: "Showroom", required: true },
   rating: { type: Number, required: true },
   comment: { type: String },
   date: { type: String, default: Date.now() }
}, { timestamps: true })

export const Review = mongoose.model("Review", ReviewSchema)