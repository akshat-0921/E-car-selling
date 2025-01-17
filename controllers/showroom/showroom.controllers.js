import { Showroom } from "../../models/showroom.models.js";
import { Brand } from "../../models/brand.models.js";
import { Car } from "../../models/car.models.js";

const addShowroom = async (req, res) => {
   try {
      const brandId = req.params._id;
      const { name, address, city, state, zipCode, contactNumber, lat, lon } = req.body;

      const newShowroom = await Showroom.create({ brand: brandId, name, address, city, state, zipCode, contactNumber, lat, lon });
      const updatedBrand = await Brand.findByIdAndUpdate(
         { _id: brandId }, { $push: { showrooms: newShowroom._id } }, { new: true }
      );

      return res.status(201).json({ success: true, msg: "Showroom added", showroom: newShowroom });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occured while adding showroom. Please try again later" });
   }
}

const getShowroom = async (req, res) => {
   try {
      const showroomId = req.params._id;
      const showroom = await Showroom.findById(showroomId);
      if (!showroom) { return res.status(404).json({ success: false, msg: "Showroom not found" }) }

      return res.status(200).json({ success: true, showroom });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occured while adding showroom. Please try again later" });
   }
}

const getAllShowrooms = async (req, res) => {
   try {
      const showrooms = await Showroom.find()
      if (showrooms.length === 0) return res.status(200).json({ success: true, msg: "No showroom found", showrooms: [] })
      return res.status(200).json({ success: true, msg: "All showrooms fetched", showrooms })
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occured while fetching showroom. Please try again later" });
   }
}

const findNearbyShowrooms = async (req, res) => {
   try {
      const { lat, lon, radius } = req.query
      if (!lat || !lon) { return res.status(400).json({ success: false, msg: "Latitude and longitude are required" }) }

      const nearbyShowrooms = await Showroom.find({
         coordinates: {
            $nearSphere: {
               $geometry: {
                  type: "Point",
                  coordinates: [lon, lat]
               },
               $maxDistance: radius ? radius * 1000 : 10000 //10 km default
            }
         }
      })

      if (nearbyShowrooms.length === 0) { return res.status(400).json({ success: false, msg: "No nearby showrooms found" }) }
      return res.status(200).json({ success: true, msg: "Nearby showrooms fetched", showrooms: nearbyShowrooms })
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occured while fetching nearby showrooms. Please try again later" });
   }
}

const deleteShowroom = async (req, res) => {
   try {
      const showroomId = req.params._id;
      const showroom = await Showroom.findById(showroomId);
      if (!showroom) { return res.status(404).json({ success: false, msg: "Showroom not found" }) }

      const brandId = showroom.brand;
      const brand = await Brand.findByIdAndUpdate(
         { _id: brandId }, { $pull: { showrooms: showroomId } }, { new: true }
      );
      if (!brand) { return res.status(404).json({ success: false, msg: "Brand not found" }) }

      await Car.updateMany(
         { showrooms: showroomId },
         { $pull: { showrooms: showroomId } }
      );

      await showroom.remove();

      return res.status(200).json({ success: true, msg: "Showroom deleted successfully" });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occured while deleting showroom. Please try again later" });
   }
}

export { addShowroom, getShowroom, getAllShowrooms, findNearbyShowrooms, deleteShowroom };
