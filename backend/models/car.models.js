import mongoose, { Schema } from "mongoose";

// Engine Schema
const engineSchema = new Schema({
   engine: { type: String },
   power: { type: String },
   torque: { type: String },
   fuelCapacity: { type: String }
});

// Performance Schema
const performanceSchema = new Schema({
   topSpeed: { type: String },
   acceleration: { type: String },
   driveType: { type: String, enum: ["FWD", "RWD", "AWD", "4WD"] },
   suspension: { type: String }
});

// Transmission Schema
const transmissionSchema = new Schema({
   transmission: { type: String },
   gearCount: { type: String }
});

// Dimension Schema
const dimensionSchema = new Schema({
   length: { type: String },
   width: { type: String },
   height: { type: String },
   groundClearance: { type: String },
   weight: { type: String }
});

// Safety Features Schema
const safetySchema = new Schema({
   airbags: { type: Boolean, default: false },
   brakingSystem: { type: String, enum: ["ABS", "ESC", "AEB"] },
   cameraAndSensor: { type: [String] },
   crashTestRating: { type: String }
});

// Connectivity Schema
const connectivitySchema = new Schema({
   connectivity: { type: [String] },
   voiceControl: { type: Boolean },
   keylessEntry: { type: String }
});

// Warranty Schema
const warrantySchema = new Schema({
   warrantyPeriod: { type: String },
   serviceInterval: { type: String } // every 10000 km
});

// Customization Schema
const customisationSchema = new Schema({
   trimLevels: { type: String }, // base, sport, luxury
   color: { type: [String] },
   addOn: { type: [String] }
});

// Main Car Schema
const CarSchema = new Schema({
   brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
   name: { type: String, required: true },
   category: {
      type: String, required: true,
      enum: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "Hydrogen", "LPG", "Plug-in Hybrid", "Ethanol", "Biodiesel"]
   },
   showrooms: [{ type: Schema.Types.ObjectId, ref: "Showroom" }],
   engine: engineSchema,
   performance: performanceSchema,
   transmission: transmissionSchema,
   dimensions: dimensionSchema,
   safetyFeatures: safetySchema,
   connectivity: connectivitySchema,
   warranty: warrantySchema,
   customisation: customisationSchema,
   year: { type: String },
   price: { type: Number }
}, { timestamps: true });

export const Car = mongoose.model("Car", CarSchema);
