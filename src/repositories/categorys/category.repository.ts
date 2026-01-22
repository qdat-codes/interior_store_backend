import { PipelineStage } from "mongoose";
import CategoryModel from "../../models/categories/categories.model";
import { ProductCategoryType } from "../../types/index.type";

export const CategoryRepository = {
  async getAllCategory(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const pipeline = [
        {
          $sort: { createAt: -1 },
        },
        {
          $skip: skip,
        },
        { $limit: limit },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
          },
        },
      ] as PipelineStage[];

      const allCategory = await CategoryModel.aggregate(pipeline);
      const total = await CategoryModel.countDocuments();
      const totalPages = Math.ceil(total / limit);
      return {
        data: allCategory,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch (error) {
      throw new Error("Error when get all category " + error);
    }
  },

  async getCategoryBySearch(
    condition: {
      name?: string;
    },
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const skip = (page - 1) * limit;

      const pageCondition: any = {};
      if (condition?.name) {
        const search = condition.name.trim();
        pageCondition.name = { $regex: search, option: "i" };
      }

      const pipeline = [
        {
          $match: pageCondition,
        },
        {
          $sort: { createAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
          },
        },
      ] as PipelineStage[];

      const product = await CategoryModel.aggregate(pipeline);
      const total = await CategoryModel.countDocuments(pageCondition);
      const totalPages = Math.ceil(total / limit);
      return {
        data: product,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch (error) {
      throw new Error("Error when get category by condition: " + error);
    }
  },

  async createCategory(data: ProductCategoryType) {
    try {
      const newCategory = await CategoryModel.create(data);
      return newCategory;
    } catch (error) {
      throw new Error("Error when create category: " + error);
    }
  },

  async updateCategory(id: string, data: Partial<ProductCategoryType>) {
    try {
      const updateCategory = await CategoryModel.findByIdAndUpdate(id, data, { new: true });
      if (!updateCategory) throw new Error("Category not found");
      return updateCategory;
    } catch (error) {
      throw new Error("Error when update category: " + error);
    }
  },

  async deleteCategory(id: string) {
    try {
      const deleteCategory = await CategoryModel.findByIdAndDelete(id);
      if (!deleteCategory) throw new Error("Category not found");
      return deleteCategory;
    } catch (error) {
      throw new Error("Error when delete category: " + error);
    }
  },
};
