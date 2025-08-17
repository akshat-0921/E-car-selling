import { Showroom } from "../../models/showroom.models.js";
import { Vehicle } from "../../models/vehicle.models.js";
import { Inventory } from "../../models/inventory.models.js";

export const addVehicleToInventory = async (req, res) => {
   try {
      const { showroomId, vehicleId, quantity, price } = req.body;

      if (!showroomId || !vehicleId || quantity === undefined) {
         return res.status(400).json({
            success: false,
            msg: "Showroom ID, Vehicle ID, and Quantity are required."
         });
      }

      const showroom = await Showroom.findById(showroomId);
      if (!showroom) {
         return res.status(404).json({ success: false, msg: "Showroom not found." });
      }

      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) {
         return res.status(404).json({ success: false, msg: "Vehicle not found." });
      }

      // 👉 use provided price OR fallback to vehicle.price
      const finalPrice = price !== undefined ? price : vehicle.price;

      let inventoryItem = await Inventory.findOne({ showroomId, vehicleId });

      if (!inventoryItem) {
         const newInventoryItem = await Inventory.create({
            showroomId,
            vehicleId,
            quantity,
            price: finalPrice
         });
         return res.status(201).json({
            success: true,
            msg: "Vehicle added to showroom inventory.",
            inventory: newInventoryItem
         });
      }

      // If inventory already exists, update it instead
      inventoryItem.quantity += Number(quantity);
      inventoryItem.price = finalPrice;
      await inventoryItem.save();

      return res.status(200).json({
         success: true,
         msg: "Inventory updated successfully.",
         inventory: inventoryItem
      });

   } catch (error) {
      console.error("Error adding vehicle to inventory:", error);
      return res.status(500).json({
         success: false,
         msg: "An error occurred while adding vehicle to inventory.",
         error: error.message
      });
   }
};


// export const addVehicleToInventory = async (req, res) => {
//    try {
//       const { showroomId, vehicleId, quantity, price } = req.body;

//       if (!showroomId || !vehicleId || quantity === undefined || price === undefined) {
//          return res.status(400).json({ success: false, msg: "Showroom ID, Vehicle ID, Quantity, and Price are all required." });
//       }

//       const showroom = await Showroom.findById(showroomId);
//       if (!showroom) {
//          return res.status(404).json({ success: false, msg: "Showroom not found." });
//       }
//       const vehicle = await Vehicle.findById(vehicleId);
//       if (!vehicle) {
//          return res.status(404).json({ success: false, msg: "Vehicle not found." });
//       }

//       let inventoryItem = await Inventory.findOne({ showroomId, vehicleId })

//       if (!inventoryItem) {
//          const newInventoryItem = await Inventory.create({
//             showroomId,
//             vehicleId,
//             quantity,
//             price
//          });
//          return res.status(201).json({ success: true, msg: "Vehicle added to showroom inventory.", inventory: newInventoryItem });
//       }

//    } catch (error) {
//       console.error('Error adding vehicle to inventory:', error);
//       return res.status(500).json({
//          success: false,
//          msg: "An error occurred while adding vehicle to inventory.",
//          error: error.message
//       });
//    }
// }

export const getShowroomInventory = async (req, res) => {
   try {
      const { showroomId } = req.params;

      const showroom = await Showroom.findById(showroomId);
      if (!showroom) {
         return res.status(404).json({ success: false, msg: "Showroom not found." });
      }

      const inventory = await Inventory.find({ showroomId }).populate("vehicleId");

      if (!inventory || inventory.length === 0) {
         return res.status(200).json({ success: true, msg: "No vehicles found in this showroom's inventory.", vehicles: [] });
      }

      return res.status(200).json({ success: true, msg: "Showroom inventory fetched successfully.", vehicles: inventory });

   } catch (error) {
      console.error('Error fetching showroom inventory:', error);
      return res.status(500).json({
         success: false,
         msg: "An error occurred while fetching inventory.",
         error: error.message
      });
   }
}

export const updateInventory = async (req, res) => {
   try {
      const { inventoryId } = req.params;
      const { quantity, price } = req.body;

      if (quantity === undefined && price === undefined) {
         return res.status(400).json({ success: false, msg: "At least one field (quantity or price) is required for an update." });
      }

      const updatedInventoryItem = await Inventory.findByIdAndUpdate(
         inventoryId,
         { quantity, price },
         { new: true, runValidators: true }
      );

      if (!updatedInventoryItem) {
         return res.status(404).json({ success: false, msg: "Inventory item not found." });
      }

      return res.status(200).json({ success: true, msg: "Inventory updated successfully.", inventory: updatedInventoryItem });

   } catch (error) {
      console.error('Error updating inventory:', error);
      return res.status(500).json({
         success: false,
         msg: "An error occurred while updating inventory.",
         error: error.message
      });
   }
}
