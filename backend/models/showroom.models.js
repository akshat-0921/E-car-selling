import mongoose, { Schema } from "mongoose";

//Location Schema
const locationSchema = new Schema({
   name: { type: String, required: true },
   location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: {
         type: [Number], // [longitude, latitude]
         required: true
      }
   }
}, { timestamps: true });

// Ensure the GeoJSON format for indexing
locationSchema.index({ location: "2dsphere" });


const ShowroomSchema = Schema({
   brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
   name: { type: String, required: true },
   address: { type: String, required: true },
   city: { type: String, required: true },
   state: { type: String, required: true },
   zipCode: { type: Number, required: true },
   contactNumber: { type: String, required: true },
   location: locationSchema
}, { timestamps: true })

export const Showroom = mongoose.model("Showroom", ShowroomSchema)