import { Router } from "express"
import { brandIdValidation, brandValidation, handleValidationErrors } from "../middlewares/validators/brandValidation.js"
import { addBrand, deleteBrand, getAllBrands, getVehiclesInBrand, getShowroomsInBrand, updateBrand } from "../controllers/brand/brand.controllers.js"
import upload from "../middlewares/multer.middleware.js"

const router = Router()

router.post("/add", upload.single("logo"), brandValidation, handleValidationErrors, addBrand)
router.get("/get-all", getAllBrands)
router.put("/update/:_id", brandIdValidation, handleValidationErrors, updateBrand)
router.get("/get-showrooms/:_id", brandIdValidation, handleValidationErrors, getShowroomsInBrand)
router.get("/get-vehicles/:_id", brandIdValidation, handleValidationErrors, getVehiclesInBrand)
router.delete("/delete/:_id", brandIdValidation, handleValidationErrors, deleteBrand)

export default router