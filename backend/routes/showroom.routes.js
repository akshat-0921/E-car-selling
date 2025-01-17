import { Router } from "express"
import { addRandomShowroom, deleteShowroom, findNearbyShowrooms, getAllShowrooms, getShowroom } from "../controllers/showroom/showroom.controllers"
import { ShowroomValidation } from "../middlewares/validators/showroomValidation"

const router = Router()

router.post("/add/:_id", ShowroomValidation, addRandomShowroom)
router.get("/get/:_id", getShowroom)
router.get("/get_all", getAllShowrooms)
router.get("/find_nearby", findNearbyShowrooms)
router.delete("/delete/:_id", deleteShowroom)

export default router