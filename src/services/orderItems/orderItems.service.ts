import { OrderItemRepository } from "../../repositories/orderItems/orderItem.repository";
import { OrderItemsType } from "../../types/index.type";

export const OrderItemService = {
  async createOrderItem(data: OrderItemsType) {
    try {
      const newItem = OrderItemRepository.createOrderItem(data);
      return newItem;
    } catch (error) {
      throw new Error("Failed to create order item: " + error);
    }   
  },

  async getOrderItemById(id: string) {
    try {
      const orderItem = OrderItemRepository.getByOrderId(id);
      return orderItem;
    } catch (error) {
      throw new Error("Failed to get order item: " + error);
    }
  },

  async deleteOrderItem(id: string) {
    try {
      const deleteItem = OrderItemRepository.deleteOrderItem(id);
      return deleteItem;
    } catch (error) {
      throw new Error("Failed to delete order item: " + error);
    }
  },

  async updateOrderItem(id: string, data: Partial<OrderItemsType>) {
    try {
      const updateOrderItem = OrderItemRepository.updateOrderItem(id, data);
      return updateOrderItem;
    } catch (error) {
      throw new Error("Failed to update order item: " + error);
    }
  },
};
