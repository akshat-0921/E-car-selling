import mongoose, { Schema } from "mongoose";


const ShowroomSchema = Schema({
   brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
   name: { type: String, required: true },
   address: { type: String, required: true },
   city: { type: String, required: true },
   state: { type: String, required: true },
   zipCode: { type: Number, required: true },
   contactNumber: { type: String, required: true },
   lat: { type: Number, required: true },
   lon: { type: Number, required: true },
   coordinates: { type: [Number], index: '2dsphere' }
}, { timestamps: true })

ShowroomSchema.pre('save', function (next) {
   this.coordinates = [this.lon, this.lat]
   next()
})

export const Showroom = mongoose.model("Showroom", ShowroomSchema)