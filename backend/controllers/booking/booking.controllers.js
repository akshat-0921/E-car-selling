import { Booking } from "../../models/booking.models.js";
import { User } from "../../models/user.models.js"
import { Showroom } from "../../models/showroom.models.js"
import { Vehicle } from "../../models/vehicle.models.js"
import { ShowroomVehicle } from "../../models/showroomVehicle.models.js";

const checkVehicleAvailability = async (req, res) => {
    try {
        const userId = req.user._id
        const { showroomId, vehicleId } = req.params
        const { lon, lat, radius } = req.body

        if (!userId) { return res.status(400).json({ success: false, msg: "User Id required" }) }
        const user = await User.findById(userId)

        const showroomWithVehicle = await ShowroomVehicle.findOne(showroomId, vehicleId)
        if (!showroomWithVehicle) { return res.status(404).json({ success: false, msg: "Vehicle not found in showroom" }) }

        const showroom = await Showroom.findById(showroomId)
        if (showroomWithVehicle.count > 0) { return res.status(200).json({ success: true, showroom, status: "Available", msg: "The selected vehicle is available in the showroom" }) }

        if (showroomWithVehicle.count === 0) {
            const vehicleExistsSomewhere = await ShowroomVehicle.find({ vehicleId }, { count: { $gt: 0 } })
            if (!vehicleExistsSomewhere) { return res.status(404).json({ success: false, msg: "Vehicle is currently Unavailabe" }) }
        }

        const nearestShowroom = await Showroom.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    distanceField: "distance",
                    spherical: true,
                    maxDistance: radius || 500000,
                }
            },
            { $limit: 1 }  //nearest
        ])

        if (nearestShowroom.length === 0) {
            return res.status(404).json({ success: false, msg: "No showroom within range for this vehicle" })
        }

        return res.status(200).json({ success: true, showroom: nearestShowroom[0], status: "In transit", msg: "Showroom containing the car found" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: 'An error occurred while checking vehicle availability.',
        });
    }
}

// const addBooking = async (req, res) => {
//    try {
//       const userId = req.user._id
//       const { showroomId, vehicleId } = req.params
//       const { status } = req.body

//       if (!userId) { return res.status(400).json({ success: false, msg: "User ID required" }); }
//       if (!showroomId) { return res.status(400).json({ success: false, msg: "Showroom ID required" }); }
//       if (!vehicleId) { return res.status(400).json({ success: false, msg: "Vehicle ID required" }); }

//       const user = await User.findById(userId)
//       if (!user) { return res.status(404).json({ success: false, msg: "User not found" }) }

//       const showroomWithVehicle = await ShowroomVehicle.findOne({ showroomId, vehicleId })
//       if (!showroomWithVehicle) { return res.status(404).json({ success: false, msg: "Vehicle not found in showroom" }) }
//       if (showroomWithVehicle.count <= 0) { return res.status(400).json({ success: false, msg: "Vehicle is unavailable for booking" }); }

//       const booking = await Booking.create({
//          userId, showroomId, vehicleId, status: "Pending", date: new Date()
//       })

//       await booking.save()

//       return res.status(201).json({ success: true, msg: "Payment is pending" })
//    } catch (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, msg: "An error occurred while booking" });
//    }
// }

const createBooking = async (req, res) => {
    try {
        const userId = req.user._id
        const { showroomId, vehicleId } = req.params
        const { date, amount, paymentIntentId } = req.body;

        if (!userId || !vehicleId || !date || !amount || !paymentIntentId) {
            return errorHandler(res, 400, "All fields are required");
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        let paymentStatus;

        switch (paymentIntent.status) {
            case "succeeded":
                paymentStatus = "completed";
                break;
            case "requires_confirmation":
            case "processing":
                paymentStatus = "pending";
                break;
            case "canceled":
                paymentStatus = "cancelled";
                break;
            default:
                return errorHandler(res, 400, "Invalid payment status");
        }

        const booking = await Booking.create({
            userId,
            vehicleId,
            showroomId,
            date,
            paymentStatus,
            amount,
        });

        return res.status(201).json({
            success: true,
            booking,
            message: "Booking created successfully",
        });
    } catch (error) {
        console.error("Error creating booking:", error.message);
        return errorHandler(res, 500, "Error occurred while creating the booking.");
    }
};

const getBookingHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ success: false, msg: "User not authenticated." });
        }

        // Find all bookings for the user and populate details
        const bookings = await Booking.find({ userId })
            .populate('vehicleId', 'name image price')
            .populate('showroomId', 'name city')
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, bookings });

    } catch (error) {
        console.error("Error fetching booking history:", error);
        return res.status(500).json({ success: false, msg: "Failed to fetch booking history." });
    }
};

export { checkVehicleAvailability, createBooking, getBookingHistory }