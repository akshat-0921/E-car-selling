import mongoose, { Schema } from "mongoose"
import { Showroom } from "./showroom.models"

const BrandSchema = Schema({
   name: { type: String, required: True },
   logo: { type: String },
   description: { type: String, required: true },
   showrooms: [{ type: Schema.Types.ObjectId, ref: "Showroom" }]
}, { timestamps: true })

export const Brand = mongoose.model("Brand", BrandSchema)