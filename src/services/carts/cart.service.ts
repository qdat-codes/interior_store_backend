import { CartRepository } from "../../repositories/carts/cart.repository";
import { CartItemType } from "../../types/index.type";

export const CartService = {
  async getCartByUserId(userId: string) {
    try {
      const cart = await CartRepository.getCartByUserId(userId);
      return cart;
    } catch (error) {
      throw new Error("Failed to get cart by userId: " + error);
    }
  },

  async createCart(userId: string, items: CartItemType[]) {
    try {
      const cart = await CartRepository.createCart(userId, items);
      return cart;
    } catch (error) {
      throw new Error("Failed to create cart: " + error);
    }
  },

  async updateCart(userId: string, items: CartItemType[]) {
    try {
      const cart = await CartRepository.updateCart(userId, items);
      return cart;
    } catch (error) {
      throw new Error("Failed to update cart: " + error);
    }
  },

  async addItemToCart(userId: string, item: CartItemType) {
    try {
      const cart = await CartRepository.addItemToCart(userId, item);
      return cart;
    } catch (error) {
      throw new Error("Failed to add item to cart: " + error);
    }
  },

  async updateItemQuantity(userId: string, productId: string, color: string, size: string, quantity: number) {
    try {
      const cart = await CartRepository.updateItemQuantity(userId, productId, color, size, quantity);
      return cart;
    } catch (error) {
      throw new Error("Failed to update item quantity: " + error);
    }
  },

  async removeItemFromCart(userId: string, productId: string, color: string, size: string) {
    try {
      const cart = await CartRepository.removeItemFromCart(userId, productId, color, size);
      return cart;
    } catch (error) {
      throw new Error("Failed to remove item from cart: " + error);
    }
  },

  async clearCart(userId: string) {
    try {
      const cart = await CartRepository.clearCart(userId);
      return cart;
    } catch (error) {
      throw new Error("Failed to clear cart: " + error);
    }
  },

  async deleteCart(userId: string) {
    try {
      const cart = await CartRepository.deleteCart(userId);
      return cart;
    } catch (error) {
      throw new Error("Failed to delete cart: " + error);
    }
  },
};
