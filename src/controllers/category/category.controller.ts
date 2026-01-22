import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../../services/categories/category.service";
import { HttpError } from "../../utils/httpError";

export const CategoryController = {
  async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const allCategory = await CategoryService.getAllCategory(page, limit);
      res.status(200).json(allCategory);
    } catch (error) {
      next(error);
    }
  },

  async getCategoryBySearch(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { search } = req.query;

      const condition = search ? { name: search as string } : {};
      const category = await CategoryService.getCategoryBySearch(
        condition,
        page,
        limit
      );

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },

  async createNewCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      if (!data || !data.name) {
        throw new HttpError(400, "Name is required");
      }

      const newCategory = await CategoryService.createCategory(data);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  },

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new HttpError(400, "Category ID is required");
      }
      const data = req.body;

      if (!data) {
        throw new HttpError(400, "Data cannot be empty");
      }
      const updateCategory = await CategoryService.updateCategory(id, data);
      if (!updateCategory) {
        throw new HttpError(404, "Category not found");
      }
      res.status(200).json(updateCategory);
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new HttpError(400, "Category ID is required");
      }

      const deleteCategory = await CategoryService.deleteCategory(id);
      if (!deleteCategory) {
        throw new HttpError(404, "Category not found");
      }
      res.status(200).json(deleteCategory);
    } catch (error) {
      next(error);
    }
  },
};
