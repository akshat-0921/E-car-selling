const RatingAndReview = require("../models/review.models,js");
const Showroom = require("../models/showroom.models.js");
const mongoose = require("mongoose");

exports.createShowroomRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, showroomId } = req.body;

        const showroom = await Showroom.findOne({
            _id: showroomId,
            visitors: { $elemMatch: { $eq: userId } },
        });

        if (!showroom) {
            return res.status(404).json({
                success: false,
                message: "You are not eligible to review this showroom.",
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            showroom: showroomId,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "You have already reviewed this showroom.",
            });
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            showroom: showroomId,
        });

        await Showroom.findByIdAndUpdate(
            { _id: showroomId },
            { $push: { ratingAndReviews: ratingReview._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Showroom rating and review added successfully!",
            ratingReview,
        });
    } catch (error) {
        console.error("Error creating showroom rating and review:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getShowroomAverageRating = async (req, res) => {
    try {
        const { showroomId } = req.body;

        const result = await RatingAndReview.aggregate([
            { $match: { showroom: new mongoose.Types.ObjectId(showroomId) } },
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
            message: "No ratings have been submitted for this showroom yet.",
            averageRating: 0,
        });
    } catch (error) {
        console.error("Error fetching showroom average rating:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};