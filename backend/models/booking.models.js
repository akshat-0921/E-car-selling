import mongoose, { Schema } from "mongoose";

const BookingSchema = Schema({
   userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
   vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
   showroomId: { type: Schema.Types.ObjectId, ref: "Showroom", required: true },
   bookingDate: { type: String, required: true },
   deliveryDate: { type: String, required: true },
   status: { type: String, enum: ["In transit", "Completed", "Availabe", "Unavailabe"] },
   paymentStatus: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: "Pending" },
   amount: { type: Number, required: true },
   purpose: { type: String, enum: ["service", "test-drive", "purchase"], required: true },
}, { timestamps: true })

export const Booking = mongoose.model("Booking", BookingSchema)