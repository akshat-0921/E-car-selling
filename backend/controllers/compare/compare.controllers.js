import { Vehicle } from "../../models/vehicle.models.js";
import { Brand } from "../../models/brand.models.js"

const compareVehicles = async (req, res) => {
   try {
      const { vehicleId1, vehicleId2 } = req.body
      if (!vehicleId1 || vehicleId2) { return res.status(400).json({ success: false, msg: 'Both vehicles required' }) }

      const vehicleA = await Vehicle.findById({ vehicleId1 })
      const vehicleB = await Vehicle.findById({ vehicleId2 })
      if (!vehicleA || !vehicleB) { return res.status(404).json({ success: false, msg: 'Entered vehicles not found in database' }) }

      const brandA = await Brand.findById(vehicleA.brandId)
      const brandB = await Brand.findById(vehicleB.brandId)
      if (!brandA || !brandB) { return res.status(404).json({ success: false, msg: "Brand does not exist" }) }

      const compare = {
         brand: {
            vehicleA: brandA,
            vehicleB: brandB,
         },
         name: {
            vehicleA: vehicleA.name,
            vehicleB: vehicleB.name,
         },
         category: {
            vehicleA: vehicleA.category,
            vehicleB: vehicleB.category,
         },
         price: {
            vehicleA: vehicleA.price,
            vehicleB: vehicleB.price,
         },
         year: {
            vehicleA: vehicleA.year,
            vehicleB: vehicleB.year,
         },
         engine: {
            engineA: vehicleA.engine.engine,
            engineB: vehicleB.engine.engine,
            powerA: vehicleA.engine.power,
            powerB: vehicleB.engine.power,
            torqueA: vehicleA.engine.torque,
            torqueB: vehicleB.engine.torque,
         },
         performance: {
            topSpeedA: vehicleA.performance.topSpeed,
            topSpeedB: vehicleB.performance.topSpeed,
            accelerationA: vehicleA.performance.acceleration,
            accelerationB: vehicleB.performance.acceleration,
         },
         transmission: {
            transmissionA: vehicleA.transmission.transmission,
            transmissionB: vehicleB.transmission.transmission,
            gearCountA: vehicleA.transmission.gearCount,
            gearCountB: vehicleB.transmission.gearCount,
         },
         dimensions: {
            lengthA: vehicleA.dimensions.length,
            lengthB: vehicleB.dimensions.length,
            widthA: vehicleA.dimensions.width,
            widthB: vehicleB.dimensions.width,
            heightA: vehicleA.dimensions.height,
            heightB: vehicleB.dimensions.height,
         },
         safety: {
            airbagsA: vehicleA.safetyFeatures.airbags,
            airbagsB: vehicleB.safetyFeatures.airbags,
            brakingSystemA: vehicleA.safetyFeatures.brakingSystem,
            brakingSystemB: vehicleB.safetyFeatures.brakingSystem,
            crashTestRatingA: vehicleA.safetyFeatures.crashTestRating,
            crashTestRatingB: vehicleB.safetyFeatures.crashTestRating,
         },
         connectivity: {
            connectivityA: vehicleA.connectivity.connectivity,
            connectivityB: vehicleB.connectivity.connectivity,
            voiceControlA: vehicleA.connectivity.voiceControl,
            voiceControlB: vehicleB.connectivity.voiceControl,
         },
         warranty: {
            warrantyPeriodA: vehicleA.warranty.warrantyPeriod,
            warrantyPeriodB: vehicleB.warranty.warrantyPeriod,
         },
         customisation: {
            trimLevelsA: vehicleA.customisation.trimLevels,
            trimLevelsB: vehicleB.customisation.trimLevels,
            colorA: vehicleA.customisation.color,
            colorB: vehicleB.customisation.color,
         }
      }
      return res.status(200).json({ success: true, compare, msg: "Comparision fetched" })

   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, msg: 'An error occured while comparing' })
   }
}