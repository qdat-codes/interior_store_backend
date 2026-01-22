import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/users/user.service";
import { HttpError } from "../../utils/httpError";

export const UserController = {
    async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, limit } = req.query;

            const pageNumber = parseInt(page as string) || 1;
            const limitNumber = parseInt(limit as string) || 10;

            const users = await UserService.getAllUser(pageNumber, limitNumber);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw new HttpError(400, "userId is required");
            }
            const user = await UserService.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    async getUserBySearch(req: Request, res: Response, next: NextFunction) {
        try {
            const { search } = req.query;
            const { page, limit } = req.query;
            const pageNumber = parseInt(page as string) || 1;
            const limitNumber = parseInt(limit as string) || 10;
            if (!search) {
                throw new HttpError(400, "search is required");
            }
            const user = await UserService.getUserBySearch(search as string, pageNumber, limitNumber);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw new HttpError(400, "userId is required");
            }
        } catch (error) {
            next(error);
        }
    },

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw new HttpError(400, "userId is required");
            }
        } catch (error) {
            next(error);
        }
    },

    async addFavoriteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw new HttpError(400, "userId is required");
            }
        } catch (error) {
            next(error);
        }
    },

    async removeFavoriteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw new HttpError(400, "userId is required");
            }
        } catch (error) {
            next(error);
        }
    },

    async getAllFavoriteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id;
            if (!userId) {
                throw new HttpError(400, "userId is required");
            }
        } catch (error) {
            next(error);
        }
    },
}
