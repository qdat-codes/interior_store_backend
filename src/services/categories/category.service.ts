import { CategoryRepository } from "../../repositories/categorys/category.repository";
import { ProductCategoryType } from "../../types/index.type";

export const CategoryService = {
  async getAllCategory(page: number = 1, limit: number = 10) {
    try {
      const allCategory = await CategoryRepository.getAllCategory(page, limit);
      return allCategory;
    } catch (error) {
      throw new Error("Failed to get all category: " + error);
    }
  },

  async getCategoryByCondition(
    condition: {
      name?: string;
    },
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const category = await CategoryRepository.getCategoryByCondition(
        condition,
        page,
        limit
      );
      return category;
    } catch (error) {
      throw new Error("Failed to get category by condition: " + error);
    }
  },

  async createCategory(data: ProductCategoryType) {
    try {
      const newCategory = await CategoryRepository.createCategory(data);
      return newCategory;
    } catch (error) {
      throw new Error("Failed to create category: " + error);
    }
  },

  async updateCategory(id: string, data: Partial<ProductCategoryType>) {
    try {
      const updateCategory = await CategoryRepository.updateCategory(id, data);
      return updateCategory;
    } catch (error) {
      throw new Error("Failed to update category: " + error);
    }
  },

  async deleteCategory(id: string) {
    try {
      const deleteCategory = await CategoryRepository.deleteCategory(id);
      return deleteCategory;
    } catch (error) {
      throw new Error("Failed to delete category: " + error);
    }
  },
};
