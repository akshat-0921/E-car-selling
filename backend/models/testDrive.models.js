import mongoose, { Schema } from "mongoose";

const TestDriveSchema = Schema({
   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
   brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
   showroom: { type: Schema.Types.ObjectId, ref: "Showroom", required: true },
   scheduledDate: { type: String, required: true },
   status: { type: String, required: true, enum: ["Pending", "Completed", "Cancelled", "Confirmed"] }
}, { timestamps: true })

export const TestDrive = mongoose.model("TestDrive", TestDriveSchema)