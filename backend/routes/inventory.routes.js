import express from "express"

import { addVehicleToInventory, getShowroomInventory, updateInventory } from "../controllers/inventory/inventory.controllers.js"

const router = express.Router();


router.post('/add-vehicle', addVehicleToInventory);
router.get('/:showroomId', getShowroomInventory);
router.post('/update/:inventoryId', updateInventory)

export default router