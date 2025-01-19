import { Vehicle } from "../../models/vehicle.models.js";
import { Brand } from "../../models/brand.models.js";
import { Showroom } from "../../models/showroom.models.js";

const addVehicle = async (req, res) => {
   try {
      const brandId = req.params?._id;
      const { name, category, price, year } = req.body;
      const { engine, performance, transmission, dimensions, safetyFeatures, connectivity, warranty, customisation } = req.body;

      const vehicle = await Vehicle.create({
         name,
         category,
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
         buyers: []
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
      return res.status(200).json({ success: true, msg: "Vehicle found", vehicle });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while fetching the vehicle. Please try again" });
   }
};

const updateVehicle = async (req, res) => {
   try {
      const vehicleId = req.params._id;
      if (!req.body) { return res.status(400).json({ success: false, msg: "Enter some fields" }) }

      const { name, category, price, year } = req.body;
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
               price: price || vehicle.price,
               year: year || vehicle.year,
               engine: engine || vehicle.engine,
               performance: performance || vehicle.performance,
               transmission: transmission || vehicle.transmission,
               dimensions: dimensions || vehicle.dimensions,
               safetyFeatures: safetyFeatures || vehicle.safetyFeatures,
               connectivity: connectivity || vehicle.connectivity,
               warranty: warranty || vehicle.warranty,
               customisation: customisation || vehicle.customisation,
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

      const showrooms = vehicle.showrooms;

      await Promise.all(
         vehicle.showrooms.map(async (showroomId) => {
            const showroom = await Showroom.findByIdAndUpdate(
               { _id: showroomId },
               { $pull: { vehicles: vehicleId } },
               { new: true }
            );
            if (!showroom) { return res.status(404).json({ success: false, msg: "Showroom not found" }) }
         })
      );

      const brandId = vehicle.brandId;
      const updateBrand = await Brand.findByIdAndUpdate({ _id: brandId }, { $pull: { vehicles: vehicleId } });
      if (!updateBrand) { return res.status(404).json({ success: false, msg: "Brand not found" }) }

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
      const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { $push: { showrooms: showroomId } });
      const showroom = await Showroom.findByIdAndUpdate(showroomId, { $push: { vehicles: vehicleId } });
      return res.status(200).json({ success: true, msg: `Vehicle ${vehicle.name} added to showroom ${showroom.name}` });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "An error occurred while adding vehicle to showroom. Please try again" });
   }
};

const removeVehicleFromShowroom = async (req, res) => {
   try {
      const vehicleId = req.params._id;
      const { showroomId } = req.body;
      const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, { $pull: { showrooms: showroomId } });
      const showroom = await Showroom.findByIdAndUpdate(showroomId, { $pull: { vehicles: vehicleId } });
      return res.status(200).json({ success: true, msg: `Vehicle ${vehicle.name} removed from showroom ${showroom.name}` });
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
         { $push: { buyers: userId } },
         { new: true }
      );

      if (!vehicle) {
         return res.status(404).json({ success: false, msg: "Vehicle not found" });
      }

      return res.status(200).json({
         success: true,
         msg: "Vehicle purchased successfully and buyer added!",
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
   purchaseVehicle,
};
