import { Request, Response } from "express";
import { CategoryService } from "../../services/categories/category.service";

export const CategoryController = {
  async getAllCategory(req: Request, res: Response) {
    try {
      const page = parseInt(req.params.page as string) || 1;
      const limit = parseInt(req.params.limit as string) || 10;

      const allCategory = await CategoryService.getAllCategory(page, limit);
      return res.status(200).json(allCategory);
    } catch (error: any) {
      console.error("Error in get all category", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to get all categories" });
    }
  },

  async getCategoryByCondition(req: Request, res: Response) {
    try {
      const page = parseInt(req.params.page as string) || 1;
      const limit = parseInt(req.params.limit as string) || 10;

      const { condition } = req.body.condition;

      const category = await CategoryService.getCategoryByCondition(
        condition,
        page,
        limit
      );

      return res.status(200).json(category);
    } catch (error: any) {
      console.error("Error in get category by condition", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to get category" });
    }
  },

  async createNewCategory(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data) throw new Error("Data can not empty");

      const newCategory = CategoryService.createCategory(data);
      return res.status(200).json(newCategory);
    } catch (error: any) {
      console.error("Error in create new category", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to create new category" });
    }
  },

  async updateCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) throw new Error("Cant find category");
      const data = req.body;

      if (!data) throw new Error("Data can not empty");
      const updateCategory = CategoryService.updateCategory(id, data);
      return res.status(200).json(updateCategory);
    } catch (error: any) {
      console.error("Error in update  category", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to update category" });
    }
  },

  async deleteCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) throw new Error("Cant find category");

      const deleteCategory = CategoryService.deleteCategory(id);
      return res.status(200).json(deleteCategory);
    } catch (error: any) {
      console.error("Error in delete category", error);
      res
        .status(500)
        .json({ message: error.message || "Failed to delete category" });
    }
  },
};
