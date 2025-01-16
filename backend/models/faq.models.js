import mongoose, { Schema } from "mongoose";

const FaqSchema = Schema({
   query: { type: String, required: true },
   response: { type: String, required: true }
}, { timestamps: true })

export const Faq = mongoose.model("Faq", FaqSchema)