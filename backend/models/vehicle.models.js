import mongoose, { Schema } from "mongoose";

// Engine Schema
const engineSchema = new Schema({
   engine: { type: String, default: "N/A" },
   power: { type: String, default: "N/A" },
   torque: { type: String, default: "N/A" },
   fuelCapacity: { type: String, default: "N/A" }
});

// Performance Schema
const performanceSchema = new Schema({
   topSpeed: { type: String, default: "N/A" },
   acceleration: { type: String, default: "N/A" },
   driveType: { type: String, enum: ["FWD", "RWD", "AWD", "4WD"], default: "N/A" },
   suspension: { type: String, default: "N/A" }
});

// Transmission Schema
const transmissionSchema = new Schema({
   transmissionType: { type: String, default: "N/A" },
   gearCount: { type: String, default: "N/A" }
});

// Dimension Schema
const dimensionSchema = new Schema({
   length: { type: String, default: "N/A" },
   width: { type: String, default: "N/A" },
   height: { type: String, default: "N/A" },
   groundClearance: { type: String, default: "N/A" },
   weight: { type: String, default: "N/A" }
});

// Safety Features Schema
const safetySchema = new Schema({
   airbags: { type: Boolean, default: false },
   brakingSystem: { type: String, enum: ["ABS", "ESC", "AEB"], default: "N/A" },
   cameraAndSensor: { type: [String], default: [] },
   crashTestRating: { type: String, default: "N/A" }
});

// Connectivity Schema
const connectivitySchema = new Schema({
   connectivity: { type: [String], default: [] },
   voiceControl: { type: Boolean, default: false },
   keylessEntry: { type: String, default: "N/A" }
});

// Warranty Schema
const warrantySchema = new Schema({
   warrantyPeriod: { type: String, default: "N/A" },
   serviceInterval: { type: String, default: "N/A" } // every 10000 km
});

// Customization Schema
const customisationSchema = new Schema({
   trimLevels: { type: String, default: "N/A" }, // base, sport, luxury
   color: { type: [String], default: [] },
   addOn: { type: [String], default: [] }
});

// Main Vehicle Schema
const VehicleSchema = new Schema(
   {
      brandId: { type: Schema.Types.ObjectId, ref: "Brand" },
      name: { type: String, required: true },
      category: {
         type: String, required: true,
         enum: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid", "Hydrogen", "LPG", "Plug-in Hybrid", "Ethanol", "Biodiesel"]
      }, bodyType: {
         type: String,
         required: true,
         enum: [
            "Hatchback",
            "Sedan",
            "SUV",
            "Crossover",
            "Coupe",
            "Convertible",
            "Wagon",
            "Pickup Truck",
            "Van",
            "Minivan",
            "Roadster",
            "Off-Road",
            "Compact",
            "Luxury Sedan",
            "Sports Car",
            "Electric SUV"
         ]
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
      year: { type: String, required: true },
      price: { type: Number, required: true },
      ratingAndReviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
      buyers: [{ type: Schema.Types.ObjectId, ref: "User" }]
   },
   { timestamps: true }
);

export const Vehicle = mongoose.model("Vehicle", VehicleSchema);
