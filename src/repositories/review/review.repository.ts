import ReviewModel from "../../models/reviews/review.model";
import { ReviewType } from "../../types/index.type";

export const ReviewRepository = {
    async createReview(productId: string, userId: string, rating: number, comment: string) {
        try {
            const review = await ReviewModel.create({ productId, userId, rating, comment });
            return review;
        } catch (error) {
            throw new Error("Failed to create review: " + error);
        }
    },

    async updateReview(reviewId: string, data: Partial<ReviewType>) {
        try {
            const review = await ReviewModel.findByIdAndUpdate(reviewId, data, { new: true });
            return review;
        } catch (error) {
            throw new Error("Failed to update review: " + error);
        }
    },

    async deleteReview(reviewId: string) {
        try {
            const review = await ReviewModel.findByIdAndDelete(reviewId);
            return review;
        } catch (error) {
            throw new Error("Failed to delete review: " + error);
        }
    },

    async getReviewByProductId(productId: string) {
        try {
            const review = await ReviewModel.find({ productId });
            return review;
        } catch (error) {
            throw new Error("Failed to get review by productId: " + error);
        }
    },

    async getAllReview(search?: string, page: number = 1, limit: number = 10) {
        try {
            const skip = (page - 1) * limit;
            const query = search
                ? { comment: { $regex: search, $options: "i" } }
                : {};
            const review = await ReviewModel.find(query).skip(skip).limit(limit);
            const total = await ReviewModel.countDocuments(query);
            const totalPages = Math.ceil(total / limit);
            return {
                data: review,
                pagination: {
                    total,
                    page,
                    totalPages,
                    limit,
                },
            };
        } catch (error) {
            throw new Error("Failed to get all review: " + error);
        }
    },
}
