import { NextFunction, Request, Response } from "express";
import { OrderService } from "../../services/orders/order.service";

export const OrderController = {
  async getAllOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.params.page as string) || 1;
      const limit = parseInt(req.params.limit as string) || 10;

      const allOrder = OrderService.getAllOrder(page, limit);
      if (!allOrder)
        return res.error("PRODUCT_NOT_FOUND", "Không tìm thấy sản phẩm", 404);

      return res.success(
        allOrder,
        "FOUND_PRODUCT",
        "Lấy tất cả sản phẩm thành công",
        200
      );
    } catch (error) {
      next(error);
    }
  },

  async getOrderByCondition(req: Request, res: Response, next: NextFunction) {
    try {
      const { condition } = req.body;

      const page = parseInt(req.params.page as string) || 1;
      const limit = parseInt(req.params.limit as string) || 10;

      const order = OrderService.getOrderByCondition(condition, page, limit);
      if (!order)
        res.error("PRODUCT_NOT_FOUND", "Không tìm thấy sản phẩm", 404);

      return res.success(
        order,
        "FOUND_PRODUCT",
        "Lấy sản phẩm thành công",
        200
      );
    } catch (error) {
      next(error);
    }
  },
};
