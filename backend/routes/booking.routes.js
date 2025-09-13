// In backend/src/routes/booking.routes.js

import { Router } from "express";
import {
    checkVehicleAvailability,
    getBookingHistory,
    createBooking
} from "../controllers/booking/booking.controllers.js"
import { userAuth } from "../middlewares/auth/userAuth.middleware.js";

const router = Router();

router.use(userAuth);

router.route("/check-availability/:showroomId/:vehicleId").post(checkVehicleAvailability);

router.route("/history").get(getBookingHistory);

router.route("/create/:showroomId/:vehicleId").post(createBooking);

export default router;