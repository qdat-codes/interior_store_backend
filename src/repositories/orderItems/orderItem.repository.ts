import OrderItemModel from "../../models/orderItems/orderItems.model";
import OrderModel from "../../models/orders/order.model";
import { OrderItemsType } from "../../types/index.type";

export const OrderItemRepository = {
  async createOrderItem(data: OrderItemsType) {
    try {
      const newItem = OrderItemModel.create(data);
      return newItem;
    } catch (error) {
      throw new Error("Failed to create order item: " + error);
    }
  },

  async getByOrderId(orderId: string) {
    try {
      const item = OrderModel.findById(orderId);
      return item;
    } catch (error) {
      throw new Error("Failed to get order by id: " + error);
    }
  },

  async deleteOrderItem(id: string) {
    try {
      const deleteOrderItem = OrderModel.findByIdAndDelete(id);
      return deleteOrderItem;
    } catch (error) {
      throw new Error("Failed to delete order items: " + error);
    }
  },

  async updateOrderItem(id: string, data: Partial<OrderItemsType>) {
    try {
      const updateOrderItem = OrderModel.findByIdAndUpdate(id, data);

      if (!updateOrderItem) throw new Error("Cant found order item");
      return updateOrderItem;
    } catch (error) {
      throw new Error("Failed to update order items: " + error);
    }
  },
};
