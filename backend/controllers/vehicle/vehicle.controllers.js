import { Vehicle } from "../../models/vehicle.models.js";
import { Brand } from "../../models/brand.models.js";
import { Showroom } from "../../models/showroom.models.js";
import { ShowroomVehicle } from "../../models/showroomVehicle.models.js";
import { User } from "../../models/user.models.js";

const addVehicle = async (req, res) => {
   try {
      const brandId = req.params._id;
      const { name, category, price, year, bodyType } = req.body;
      const { engine, performance, transmission, dimensions, safetyFeatures, connectivity, warranty, customisation } = req.body;
      const brand = await Brand.findById(brandId);
      if (!brand) { return res.status(404).json({ success: false, msg: "Brand does not exist" }); }
      const vehicle = await Vehicle.create({
         name,
         category,
         bodyType,
         year,
         price,
         brandId,
         engine,
         performance,
         transmission,
         dimensions,
         safetyFeatures,
         connectivity,
         warranty,
         customisation,
         buyers: [],
         showrooms: []
      });

      return res.status(201).json({ success: true, msg: "Vehicle added to database", vehicle });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while adding the vehicle. Please try again" });
   }
};

const getAllVehicles = async (req, res) => {
   try {
      const vehicles = await Vehicle.find();
      if (vehicles.length === 0) {
         return res.status(200).json({ success: true, msg: "No vehicle found", vehicles: [] });
      }
      return res.status(200).json({ success: true, msg: "All vehicles fetched", vehicles });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while fetching all vehicles. Please try again" });
   }
};

const getVehicle = async (req, res) => {
   try {
      const vehicleId = req.params._id;
      const vehicle = await Vehicle.findById(vehicleId);

      if (!vehicle) {
         return res.status(404).json({ success: false, msg: "Vehicle does not exist" });
      }

      const brand = await Brand.findById(vehicle.brandId);

      const vehicleObject = vehicle.toObject();
      vehicleObject.brand = brand;

      return res.status(200).json({ success: true, msg: "Vehicle found", vehicle: vehicleObject });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while fetching the vehicle. Please try again" });
   }
};


const updateVehicle = async (req, res) => {
   try {
      const vehicleId = req.params._id;
      if (!req.body) { return res.status(400).json({ success: false, msg: "Enter some fields" }); }

      const { name, category, price, year, bodyType } = req.body;
      const { engine, performance, transmission, dimensions, safetyFeatures, connectivity, warranty, customisation } = req.body;

      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
         return res.status(404).json({ success: false, msg: "Vehicle does not exist" });
      }

      const updatedVehicle = await Vehicle.findByIdAndUpdate(
         { _id: vehicleId },
         {
            $set: {
               name: name || vehicle.name,
               category: category || vehicle.category,
               bodyType: bodyType || vehicle.bodyType,
               price: price || vehicle.price,
               year: year || vehicle.year,
               engine: engine || vehicle.engine,
               performance: performance || vehicle.performance,
               transmission: transmission || vehicle.transmission,
               dimensions: dimensions || vehicle.dimensions,
               safetyFeatures: safetyFeatures || vehicle.safetyFeatures,
               connectivity: connectivity || vehicle.connectivity,
               warranty: warranty || vehicle.warranty,
               customisation: customisation || vehicle.customisation
            }
         },
         { new: true }
      );
      return res.status(200).json({ success: true, message: "Vehicle has been updated", vehicle: updatedVehicle });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while updating vehicle. Please try again" });
   }
};

const deleteVehicle = async (req, res) => {
   try {
      const vehicleId = req.params._id;
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
         return res.status(404).json({ success: false, msg: "Vehicle does not exist" });
      }

      await Promise.all(
         vehicle.showrooms.map(async (showroomId) => {
            await Showroom.findByIdAndUpdate(
               { _id: showroomId },
               { $pull: { vehicles: vehicleId } },
               { new: true }
            );
         })
      );

      const brandId = vehicle.brandId;
      await Brand.findByIdAndUpdate({ _id: brandId }, { $pull: { vehicles: vehicleId } });
      await Vehicle.findByIdAndDelete(vehicleId);

      return res.status(200).json({ success: true, msg: "Vehicle deleted successfully" });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while deleting vehicle. Please try again" });
   }
};

const insertVehicleToShowroom = async (req, res) => {
   try {
      const vehicleId = req.params._id;
      const { showroomId } = req.body;
      if (!showroomId) { return res.status(400).json({ success: false, msg: "Showroom id required" }); }
      const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { $addToSet: { showrooms: showroomId } });
      const showroom = await Showroom.findByIdAndUpdate(showroomId, { $addToSet: { vehicles: vehicleId } });
      await ShowroomVehicle.create({ showroomId, vehicleId });
      return res.status(200).json({ success: true, msg: `Vehicle added to showroom` });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while adding vehicle to showroom. Please try again" });
   }
};

const removeVehicleFromShowroom = async (req, res) => {
   try {
      const vehicleId = req.params._id;
      const { showroomId } = req.body;
      if (!showroomId) { return res.status(400).json({ success: false, msg: "Showroom id required" }); }
      const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { $pull: { showrooms: showroomId } });
      const showroom = await Showroom.findByIdAndUpdate(showroomId, { $pull: { vehicles: vehicleId } });
      await ShowroomVehicle.findOneAndDelete({ showroomId, vehicleId });
      return res.status(200).json({ success: true, msg: `Vehicle removed from showroom` });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while removing vehicle from showroom. Please try again" });
   }
};

const purchaseVehicle = async (req, res) => {
   try {
      const { userId, vehicleId } = req.body;

      const vehicle = await Vehicle.findByIdAndUpdate(
         vehicleId,
         { $addToSet: { buyers: userId } },
         { new: true }
      );

      if (!vehicle) {
         return res.status(404).json({ success: false, msg: "Vehicle not found" });
      }

      await User.findByIdAndUpdate(
         userId,
         { $addToSet: { purchasedVehicles: vehicleId } },
         { new: true }
      );

      return res.status(200).json({
         success: true,
         msg: "Vehicle purchased successfully and buyer added",
         vehicle
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while purchasing the vehicle. Please try again" });
   }
};

export {
   addVehicle,
   getAllVehicles,
   getVehicle,
   updateVehicle,
   deleteVehicle,
   insertVehicleToShowroom,
   removeVehicleFromShowroom,
   purchaseVehicle
};
