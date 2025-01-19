import { Router } from "express"
import { addVehicle, deleteVehicle, getAllVehicles, getVehicle, insertVehicleToShowroom, removeVehicleFromShowroom, updateVehicle } from "../controllers/vehicle/vehicle.controllers.js"
import { brandIdValidation } from "../middlewares/validators/brandValidation.js"
import { handleValidationErrors, vechicleValidation, vehicleIdValidation } from "../middlewares/validators/vechicleValidation.js"

const router = Router()

router.post("/add/:_id", vechicleValidation, handleValidationErrors, addVehicle)
router.get("/get-all", getAllVehicles)
router.get("/get/:_id", vehicleIdValidation, handleValidationErrors, getVehicle)
router.put("/update/:_id", vehicleIdValidation, handleValidationErrors, updateVehicle)
router.delete("/delete/:_id", vehicleIdValidation, handleValidationErrors, deleteVehicle)
router.post("/insert-to-showroom/:_id", vehicleIdValidation, handleValidationErrors, insertVehicleToShowroom)
router.post("/delete-from-showroom/:_id", vehicleIdValidation, handleValidationErrors, removeVehicleFromShowroom)
router.post("/purchase", vehicleController.purchaseVehicle);

export default router