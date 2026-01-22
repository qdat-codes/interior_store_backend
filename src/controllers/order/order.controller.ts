import { NextFunction, Request, Response } from "express";
import { OrderService } from "../../services/orders/order.service";
import { HttpError } from "../../utils/httpError";

export const OrderController = {
  async getAllOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const allOrder = await OrderService.getAllOrder(page, limit);
      res.status(200).json(allOrder);
    } catch (error) {
      next(error);
    }
  },

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      if (!orderId) {
        throw new HttpError(400, "orderId is required");
      }
      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        throw new HttpError(404, "Order not found");
      }
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

  async getOrderByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id || req.params.userId;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const orders = await OrderService.getOrderByUserId(userId, page, limit);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  async getOrderBySearch(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentMethod, paymentStatus, status, shippingAddress } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const condition: any = {};
      if (paymentMethod) condition.paymentMethod = paymentMethod;
      if (paymentStatus) condition.paymentStatus = paymentStatus;
      if (status) condition.status = status;
      if (shippingAddress) condition.shippingAddress = shippingAddress;

      const order = await OrderService.getOrderBySearch(condition, page, limit);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const order = await OrderService.createOrder(userId, req.body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      if (!orderId) {
        throw new HttpError(400, "orderId is required");
      }
      const order = await OrderService.updateOrder(orderId, req.body);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      if (!orderId) {
        throw new HttpError(400, "orderId is required");
      }
      const order = await OrderService.deleteOrder(orderId);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
};
