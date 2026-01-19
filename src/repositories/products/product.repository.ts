import ProductModel from "../../models/products/product.model";
import { ProductType } from "../../types/index.type";
import mongoose, { PipelineStage } from "mongoose";

export const ProductRepository = {
  async getAllProduct(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const pipeline = [
        {
          $lookup: {
            from: "Category",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $sort: {
            createAt: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            name: 1,
            price: 1,
            discountPrice: 1,
            stock: 1,
            description: 1,
            image: 1,
            category: {
              _id: "$category._id",
              name: "$category.name",
            },
            createAt: 1,
          },
        },
      ] as PipelineStage[];
      const allProduct = await ProductModel.aggregate(pipeline);
      return allProduct;
    } catch (error) {
      throw new Error("Failed when to get all product " + error);
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
      const pageCondition: any = {};

      if (condition.name) {
        const search = condition.name.trim();
        pageCondition.name = { $regex: search, $options: "i" };
      }

      if (condition.categoryId) {
        pageCondition.categoryId = new mongoose.Types.ObjectId(
          condition.categoryId
        );
      }

      if (condition.minPrice || condition.maxPrice) {
        pageCondition.price = {};
        if (condition.minPrice) pageCondition.price.$gte = condition.minPrice;
        if (condition.maxPrice) pageCondition.price.$lte = condition.maxPrice;
      }

      const skip = (page - 1) * limit;

      const pipeline = [
        { $match: pageCondition },
        // join với collection category
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
        // sắp xếp theo thời gian mới nhất
        {
          $sort: { createAt: -1 },
        },
        // phân trang
        {
          $skip: skip,
        },
        { $limit: limit },
        // chỉ lấy field cần thiết
        {
          $project: {
            name: 1,
            price: 1,
            discountPrice: 1,
            stock: 1,
            description: 1,
            image: 1,
            category: {
              _id: "$category._id",
              name: "$category.name",
            },
            createAt: 1,
          },
        },
      ] as PipelineStage[];

      const products = await ProductModel.aggregate(pipeline);
      const totalProduct = await ProductModel.aggregate([
        { $match: pageCondition },
        { $count: "total" },
      ]);

      const total = totalProduct[0]?.total || 0;
      const totalPages = Math.ceil(total / limit);

      return {
        data: products,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch (error) {
      throw new Error("Failed to get products: " + error);
    }
  },

  async createProduct(data: ProductType) {
    try {
      const newProduct = await ProductModel.create(data);
      return newProduct;
    } catch (error) {
      throw new Error("Failed to create product: " + error);
    }
  },

  async updateProduct(id: string, data: Partial<ProductType>) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!updated) throw new Error("Can not found product");
      return updated;
    } catch (error) {
      throw new Error("Failed to update product" + error);
    }
  },

  async deleteProduct(id: string) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);
      if (!deleted) throw new Error("Can not found product with id:  " + id);
      return deleted;
    } catch (error) {
      throw new Error("Failed to delete product " + error);
    }
  },
};
