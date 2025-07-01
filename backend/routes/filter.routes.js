import { Router } from "express";
import { filterVehicles } from "../controllers/filter/filterVehicle.controllers.js";

const router = Router();

router.get("/", filterVehicles)

export default router