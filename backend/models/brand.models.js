import mongoose, { Schema } from "mongoose"

const BrandSchema = Schema({
   name: { type: String, required: True },
   logo: { type: String },
   description: { type: String, required: true }
}, { timestamps: true })

export const Brand = mongoose.model("Brand", BrandSchema)