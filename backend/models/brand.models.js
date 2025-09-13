import mongoose, { Schema } from "mongoose"

const BrandSchema = new mongoose.Schema({
   name: { type: String, required: true },
   logo: { type: String },
   description: { type: String },
   showrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Showroom" }], // Explicit reference to showrooms
   vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }] // Explicit reference to cars
}, { timestamps: true });



export const Brand = mongoose.model("Brand", BrandSchema)