const RatingAndReview = require("../models/review.models.js");
const Vehicle = require("../models/vehicle.models.js");
const mongoose = require("mongoose");

exports.createVehicleRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, vehicleId } = req.body;

        const vehicle = await Vehicle.findOne({
            _id: vehicleId,
            buyers: { $elemMatch: { $eq: userId } },
        });

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "You are not eligible to review this vehicle.",
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            vehicle: vehicleId,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "You have already reviewed this vehicle.",
            });
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            vehicle: vehicleId,
        });

        await Vehicle.findByIdAndUpdate(
            { _id: vehicleId },
            { $push: { ratingAndReviews: ratingReview._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Vehicle rating and review added successfully!",
            ratingReview,
        });
    } catch (error) {
        console.error("Error creating vehicle rating and review:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getVehicleAverageRating = async (req, res) => {
    try {
        const { vehicleId } = req.body;

        const result = await RatingAndReview.aggregate([
            { $match: { vehicle: new mongoose.Types.ObjectId(vehicleId) } },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } },
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        return res.status(200).json({
            success: true,
            message: "No ratings have been submitted for this vehicle yet.",
            averageRating: 0,
        });
    } catch (error) {
        console.error("Error fetching vehicle average rating:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};