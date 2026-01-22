import { NextFunction, Request, Response } from "express";
import { CartService } from "../../services/carts/cart.service";
import { HttpError } from "../../utils/httpError";

export const CartController = {
  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const cart = await CartService.getCartByUserId(userId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  async createCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const { items } = req.body;
      if (!items || !Array.isArray(items)) {
        throw new HttpError(400, "items array is required");
      }
      const cart = await CartService.createCart(userId, items);
      res.status(201).json(cart);
    } catch (error) {
      next(error);
    }
  },

  async updateCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const { items } = req.body;
      if (!items || !Array.isArray(items)) {
        throw new HttpError(400, "items array is required");
      }
      const cart = await CartService.updateCart(userId, items);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  async addItemToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const item = req.body;
      if (!item.product || !item.quantity || !item.price || !item.color || !item.size) {
        throw new HttpError(400, "product, quantity, price, color, size are required");
      }
      const cart = await CartService.addItemToCart(userId, item);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  async updateItemQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const { productId } = req.params;
      const { color, size, quantity } = req.body;
      if (!productId || !color || !size || quantity === undefined) {
        throw new HttpError(400, "productId, color, size, quantity are required");
      }
      const cart = await CartService.updateItemQuantity(userId, productId, color, size, quantity);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  async removeItemFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const { productId } = req.params;
      const { color, size } = req.body;
      if (!productId || !color || !size) {
        throw new HttpError(400, "productId, color, size are required");
      }
      const cart = await CartService.removeItemFromCart(userId, productId, color, size);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  async clearCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const cart = await CartService.clearCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  async deleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError(400, "userId is required");
      }
      const cart = await CartService.deleteCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },
};
