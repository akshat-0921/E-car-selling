import { Router } from "express"
import { addRandomShowroom } from "../controllers/showroom/showroom.controllers"
import { ShowroomValidation } from "../middlewares/validators/showroomValidation"

const router = Router()

router.post("/add/:_id", ShowroomValidation, addRandomShowroom)

export default router