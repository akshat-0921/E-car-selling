import { Router } from "express"
import { addShowroom, deleteShowroom, findNearbyShowrooms, getAllShowrooms, getShowroom } from "../controllers/showroom/showroom.controllers.js"
import { showroomIdValidation, ShowroomValidation } from "../middlewares/validators/showroomValidation.js"
import { brandIdValidation, handleValidationErrors } from "../middlewares/validators/brandValidation.js"

const router = Router()

router.post("/add/:_id", brandIdValidation, ShowroomValidation, handleValidationErrors, addShowroom)
router.get("/get/:_id", showroomIdValidation, getShowroom)
router.get("/get-all", getAllShowrooms)
router.get("/find-nearby", findNearbyShowrooms)
router.delete("/delete/:_id", showroomIdValidation, deleteShowroom)

export default router