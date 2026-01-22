import CartModel from "../../models/carts/carts.model";
import { CartType, CartItemType } from "../../types/index.type";

export const CartRepository = {
  async getCartByUserId(userId: string) {
    try {
      const cart = await CartModel.findOne({ userId })
        .populate("items.product", "_id name price images discountPrice colors sizes");
      return cart;
    } catch (error) {
      throw new Error("Failed to get cart by userId: " + error);
    }
  },

  async createCart(userId: string, items: CartItemType[]) {
    try {
      const cart = await CartModel.create({ userId, items });
      const populatedCart = await cart.populate("items.product", "_id name price images discountPrice colors sizes");
      return populatedCart;
    } catch (error) {
      throw new Error("Failed to create cart: " + error);
    }
  },

  async updateCart(userId: string, items: CartItemType[]) {
    try {
      const cart = await CartModel.findOneAndUpdate(
        { userId },
        { items },
        { new: true, upsert: true }
      ).populate("items.product", "_id name price images discountPrice colors sizes");
      return cart;
    } catch (error) {
      throw new Error("Failed to update cart: " + error);
    }
  },

  async addItemToCart(userId: string, item: CartItemType) {
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        const newCart = await CartModel.create({ userId, items: [item] });
        return await newCart.populate("items.product", "_id name price images discountPrice colors sizes");
      }

      const existingItemIndex = cart.items.findIndex(
        (cartItem) =>
          cartItem.product.toString() === item.product.toString() &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        cart.items.push(item);
      }

      await cart.save();
      return await cart.populate("items.product", "_id name price images discountPrice colors sizes");
    } catch (error) {
      throw new Error("Failed to add item to cart: " + error);
    }
  },

  async updateItemQuantity(userId: string, productId: string, color: string, size: string, quantity: number) {
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        throw new Error("Cart not found");
      }

      const itemIndex = cart.items.findIndex(
        (item) =>
          item.product.toString() === productId &&
          item.color === color &&
          item.size === size
      );

      if (itemIndex === -1) {
        throw new Error("Item not found in cart");
      }

      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      await cart.save();
      return await cart.populate("items.product", "_id name price images discountPrice colors sizes");
    } catch (error) {
      throw new Error("Failed to update item quantity: " + error);
    }
  },

  async removeItemFromCart(userId: string, productId: string, color: string, size: string) {
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        throw new Error("Cart not found");
      }

      cart.items = cart.items.filter(
        (item) =>
          !(item.product.toString() === productId && item.color === color && item.size === size)
      );

      await cart.save();
      return await cart.populate("items.product", "_id name price images discountPrice colors sizes");
    } catch (error) {
      throw new Error("Failed to remove item from cart: " + error);
    }
  },

  async clearCart(userId: string) {
    try {
      const cart = await CartModel.findOneAndUpdate(
        { userId },
        { items: [] },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error("Failed to clear cart: " + error);
    }
  },

  async deleteCart(userId: string) {
    try {
      const cart = await CartModel.findOneAndDelete({ userId });
      return cart;
    } catch (error) {
      throw new Error("Failed to delete cart: " + error);
    }
  },
};
