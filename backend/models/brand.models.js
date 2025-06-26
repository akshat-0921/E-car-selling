import mongoose, { Schema } from "mongoose"

const BrandSchema = new mongoose.Schema({
   name: { type: String, required: true },
   logo: { type: String },
   description: { type: String },
   showrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Showroom" }], // Explicit reference to showrooms
   vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }] // Explicit reference to cars
}, { timestamps: true });

// const BrandSchema = Schema({
//    name: { type: String, required: True },
//    logo: { type: String },
//    description: { type: String, required: true },
// }, { timestamps: true })

// //Virtual for showrooms
// BrandSchema.virtual('showrooms', {
//    ref: 'Showroom',
//    localField: '_id',
//    foreignField: 'brandId',
//    justOne: false
// })

// //Virtual for cars
// BrandSchema.virtual('cars', {
//    ref: "Car",
//    localField: '_id',
//    foreignField: 'brandId',
//    justOne: false
// })

// //Enable virtuals in JSON and object outputs
// BrandSchema.set('toObject', { virtuals: true })
// BrandSchema.set('toJSON', { virtuals: true })

export const Brand = mongoose.model("Brand", BrandSchema)