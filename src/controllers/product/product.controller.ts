import { ProductService } from "../../services/products/product.service";
import { Request, Response } from "express";

export const ProductController = {
  async getAllProduct(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const allProduct = await ProductService.getAllProduct(page, limit);
      if (!allProduct)
        return res.error("PRODUCT_NOT_FOUND", "Sản phẩm không tồn tại", 404);

      return res.success(
        allProduct,
        "PRODUCT_FOUND",
        "Lấy sản phẩm thành công",
        200
      );
    } catch (error: any) {
      console.error("Error in getAllProducts:", error.message);
      return res.status(500).json({
        message: error.message || "Failed to get all products",
      });
    }
  },

  async getProductByCondition(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { name, categoryId, minPrice, maxPrice } = req.query;

      const condition = {
        name: name as string,
        categoryId: categoryId as string,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      };

      const result = await ProductService.getProductByCondition(
        condition,
        page,
        limit
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error: any) {
      console.error("Error in get product by condition: ", error.message);
      return res.status(500).json({
        message: error.message || "Failed to get product",
      });
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      const data = req.body;

      const newProduct = ProductService.createProduct(data);
      return res.status(200).json({
        data: newProduct,
      });
    } catch (error: any) {
      console.error("Error in create product: ", error.message);
      return res.status(500).json({
        message: error.message || "Failed to create product",
      });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const data = req.body;

      const updatedProduct = ProductService.updateProduct(productId, data);
      return res.status(200).json({
        data: updatedProduct,
      });
    } catch (error: any) {
      console.error("Error in update product: ", error.message);
      return res.status(500).json({
        message: error.message || "Failed to update product",
      });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const deleteProduct = await ProductService.deleteProduct(id);
      return res.status(200).json({
        data: deleteProduct,
      });
    } catch (error: any) {
      console.error("Error in delete product: ", error.message);
      return res.status(500).json({
        message: error.message || "Failed to delete product",
      });
    }
  },
};
