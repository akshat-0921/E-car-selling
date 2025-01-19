import mongoose, { Schema } from "mongoose";

const ShowroomVehicleSchema = Schema({
   showrromId: { type: Schema.Types.ObjectId, ref: "Showroom", required: true },
   vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
   stock: { type: Number, default: 0 },
   sold: { type: Number }
}, { timestamps: true })

export const ShowroomVehicle = mongoose.model("ShowroomVehicle", ShowroomVehicleSchema)