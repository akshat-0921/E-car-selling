const RatingAndReview = require("../models/review.models.js");
const mongoose = require("mongoose");

exports.createWebsiteRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review } = req.body;

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            website: true,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "You have already reviewed the website.",
            });
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            website: true,
        });

        return res.status(200).json({
            success: true,
            message: "Website rating and review added successfully!",
            ratingReview,
        });
    } catch (error) {
        console.error("Error creating website rating and review:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getWebsiteAverageRating = async (req, res) => {
    try {
        const result = await RatingAndReview.aggregate([
            { $match: { website: true } },
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
            message: "No ratings have been submitted for the website yet.",
            averageRating: 0,
        });
    } catch (error) {
        console.error("Error fetching website average rating:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
