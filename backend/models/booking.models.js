import mongoose, { Schema } from "mongoose";

const BookingSchema = Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
   showroomId: { type: Schema.Types.ObjectId, ref: "Showroom", required: true },
   bookingDate: { type: String, required: true },
   deliveryDate: { type: String, required: true },
   paymentStatus: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: "Pending" },
   amount: { type: Number, required: true }
}, { timestamps: true })

export const Booking = mongoose.model("Booking", BookingSchema)