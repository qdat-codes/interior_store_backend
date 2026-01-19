import { ProductRepository } from "../../repositories/products/product.repository";
import { ProductType } from "../../types/index.type";

export const ProductService = {
  async getAllProduct(page: number = 1, limit: number = 10) {
    try {
      const allProduct = await ProductRepository.getAllProduct(page, limit);
      return allProduct;
    } catch (error) {
      throw new Error("Failed to get all product: " + error);
    }
  },

  async getProductByCondition(
    condition: {
      name?: string;
      categoryId?: string;
      minPrice?: number;
      maxPrice?: number;
    },
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const product = await ProductRepository.getProductByCondition(
        condition,
        page,
        limit
      );
      return product;
    } catch (error) {
      throw new Error("Failed to get product by condition: " + error);
    }
  },

  async createProduct(data: ProductType) {
    try {
      const newProduct = await ProductRepository.createProduct(data);
      return newProduct;
    } catch (error) {
      throw new Error("Failed to create product: " + error);
    }
  },

  async updateProduct(id: string, data: Partial<ProductType>) {
    try {
      const updateProduct = await ProductRepository.updateProduct(id, data);
      return updateProduct;
    } catch (error) {
      throw new Error("Failed to update product: " + error);
    }
  },

  async deleteProduct(id: string) {
    try {
      const deleteProduct = await ProductRepository.deleteProduct(id);
      return deleteProduct;
    } catch (error) {
      throw new Error("Failed to delete product: " + error);
    }
  },
};
