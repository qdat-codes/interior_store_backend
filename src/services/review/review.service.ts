import { ReviewRepository } from "../../repositories/review/review.repository";
import { ReviewType } from "../../types/index.type";

export const ReviewService = {
    async createReview(productId: string, userId: string, rating: number, comment: string) {
        try {
            const review = await ReviewRepository.createReview(productId, userId, rating, comment);
            return review;
        } catch (error) {
            throw new Error("Failed to create review: " + error);
        }
    },

    async updateReview(reviewId: string, data: Partial<ReviewType>) {
        try {
            const review = await ReviewRepository.updateReview(reviewId, data);
            return review;
        } catch (error) {
            throw new Error("Failed to update review: " + error);
        }
    },

    async deleteReview(reviewId: string) {
        try {
            const review = await ReviewRepository.deleteReview(reviewId);
            return review;
        } catch (error) {
            throw new Error("Failed to delete review: " + error);
        }
    },

    async getReviewByProductId(productId: string) {
        try {
            const review = await ReviewRepository.getReviewByProductId(productId);
            return review;
        } catch (error) {
            throw new Error("Failed to get review by productId: " + error);
        }
    },

    async getAllReview(search?: string, page: number = 1, limit: number = 10) {
        try {
            const allReview = await ReviewRepository.getAllReview(search, page, limit);
            return allReview;
        } catch (error) {
            throw new Error("Failed to get all review: " + error);
        }
    },
}
