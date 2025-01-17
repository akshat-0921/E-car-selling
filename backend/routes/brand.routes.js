import { Router } from "express"
import { brandIdValidation, brandValidation, handleValidationErrors } from "../middlewares/validators/brandValidation"
import { addBrand, deleteBrand, getAllBrands, getCarsInBrand, getShowroomsInBrand, updateBrand } from "../controllers/brand/brand.controllers"

const router = Router()

router.post("/add", brandValidation, handleValidationErrors, addBrand)
router.get("/get", getAllBrands)
router.post("/update/:_id", brandIdValidation, handleValidationErrors, updateBrand)
router.get("/get-showrooms/:_id", brandIdValidation, handleValidationErrors, getShowroomsInBrand)
router.get("/get-cars/:_id", brandIdValidation, handleValidationErrors, getCarsInBrand)
router.delete("/delete/:_id", brandIdValidation, handleValidationErrors, deleteBrand)

export default router