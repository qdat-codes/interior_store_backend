import { NextFunction, Request, Response } from "express";
import { ReviewService } from "../../services/review/review.service";
import { HttpError } from "../../utils/httpError";

export const ReviewController = {
    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { productId, userId, rating, comment } = req.body;
            if (!productId || !userId || !rating || !comment) {
                throw new HttpError(400, "productId, userId, rating, comment are required");
            }
            const review = await ReviewService.createReview(productId, userId, rating, comment);
            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },


    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { reviewId } = req.params;
            if (!reviewId) {
                throw new HttpError(400, "reviewId is required");
            }
            const review = await ReviewService.updateReview(reviewId, req.body);
            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },


    async deleteReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { reviewId } = req.params;
            if (!reviewId) {
                throw new HttpError(400, "reviewId is required");
            }
            const review = await ReviewService.deleteReview(reviewId);
            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },

    async getReviewByProductId(req: Request, res: Response, next: NextFunction) {
        try {
            const { productId } = req.params;
            if (!productId) {
                throw new HttpError(400, "productId is required");
            }
            const review = await ReviewService.getReviewByProductId(productId);
            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },

    async getAllReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { search } = req.query;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const review = await ReviewService.getAllReview(search as string | undefined, page, limit);
            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },
}
