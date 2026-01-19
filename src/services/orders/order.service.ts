import OrderModel from "../../models/orders/order.model";
import { OrderRepository } from "../../repositories/orders/order.repository";
import { OrderItemsType, OrderType } from "../../types/index.type";

export const OrderService = {
  async getAllOrder(page: number = 1, limit: number = 10) {
    try {
      const allOrder = await OrderRepository.getAllOrder(page, limit);
      return allOrder;
    } catch (error) {
      throw new Error("Failed when get all order: " + error);
    }
  },

  async getOrderByCondition(
    condition: {
      items: OrderItemsType[];
      paymenMethod: string;
      paymentStatus: string;
      shippingAddress: string;
    },
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const order = await OrderRepository.getOrderByCondition(
        condition,
        page,
        limit
      );
      return order;
    } catch (error) {
      throw new Error("Failed when get order by condition: " + error);
    }
  },

  async createOrder(userId: string, data: OrderType) {
    try {
      const newOrder = await OrderRepository.createOrder(userId, data);
      return newOrder;
    } catch (error) {
      throw new Error("Failed when create order" + error);
    }
  },

  async updateOrder(orderId: string, data: Partial<OrderType>) {
    try {
      const updatedOrder = await OrderRepository.updateOrder(orderId, data);
      return updatedOrder;
    } catch (error) {
      throw new Error("Failed when update order: " + error);
    }
  },

  async deleteOrder(orderId: string) {
    try {
      const deleteOrder = await OrderRepository.deleteOrder(orderId);
      return deleteOrder;
    } catch (error) {
      throw new Error("Failed when delete order " + error);
    }
  },
};
