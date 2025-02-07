import express from "express"
import { createPaymentIntent } from "../controllers/payment/payment.controllers.js"
// const { createPaymentIntent } = require("../controllers/user.controllers.js");

const router = express.Router();

router.post("/create-payment", createPaymentIntent);

export default router