import { Vehicle } from "../../models/vehicle.models.js";
import { Brand } from "../../models/brand.models.js";


const filterVehicles = async (req, res) => {
   try {
      const { brand, minPrice, maxPrice, category, bodyType, fuelType } = req.query;
      const query = {}
      if (brand) {
         const brandDetails = await Brand.findOne({ name: brand })
         if (!brandDetails) {
            return res.status(404).json({ success: false, msg: "Brand not found" })
         }
         query.brandId = brandDetails._id
      }
      // if (minPrice) query.minPrice = minPrice
      // if (maxPrice) query.maxPrice = maxPrice
      if (category) query.category = category
      if (bodyType) query.bodyType = bodyType
      if (fuelType) query.fuelType = fuelType

      if (minPrice || maxPrice) {
         query.price = {}
         if (minPrice) query.price.$gte = Number(minPrice)
         if (maxPrice) query.price.$lte = Number(maxPrice)
      }


      const vehicles = await Vehicle.find(query)

      res.status(200).json({ success: true, msg: "Required Vehicles fetched", vehicles })
   } catch (error) {
      res.status(500).json({ success: false, msg: "An error occured while fetching vehicles", error: error.message })
   }
}

export { filterVehicles }