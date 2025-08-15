import express from "express";
import { searchBrands } from "../controllers/search/search.controller.js";

const router = express.Router();

router.get("/brand", searchBrands);

export default router;
