import mongoose, { Schema } from "mongoose";

const TaxSchema = Schema({
   state: { type: String, required: true },
   roadTaxRate: { type: Number, required: true },
   registrationFeeRate: { type: Number, required: true },
   insauranceRate: { type: Number, required: true },
}, { timestamps: true })

export const Tax = mongoose.model("Tax", TaxSchema)