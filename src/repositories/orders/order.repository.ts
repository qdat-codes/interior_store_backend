import OrderModel from "../../models/orders/order.model";
import { OrderItemsType, OrderType } from "../../types/index.type";

export const OrderRepository = {
  async getAllOrder(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const allOrder = await OrderModel.find()
        .populate("userId", "_id username email address phone avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select(
          "items totalAmount paymentMethod paymentStatus shippingAddress status"
        );
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
      const skip = (page - 1) * limit;
      const pageCondition: any = {};
      if (condition?.items) {
        pageCondition.items = condition.items;
      }

      if (condition?.paymenMethod) {
        pageCondition.paymenMethod = condition.paymenMethod;
      }

      if (condition?.paymentStatus) {
        pageCondition.paymentStatus = condition.paymentStatus;
      }

      if (condition?.shippingAddress) {
        if (condition?.shippingAddress)
          pageCondition.shippingAddress = {
            $regex: condition.shippingAddress,
            $options: "i",
          };
      }

      const order = await OrderModel.find(pageCondition)
        .populate("userId", "_id username email address phone avatar")
        .sort({ createdAt: -1 }) // sắp xếp theo thời gian tạo
        .skip(skip)
        .limit(limit)
        .select(
          "items totalAmount paymentMethod paymentStatus shippingAddress status createdAt"
        );

      return order;
    } catch (error) {
      throw new Error("Failed when get order by condition: " + error);
    }
  },

  async createOrder(userId: string, data: OrderType) {
    try {
      if (!userId) throw new Error("Can't find userId");
      const newOrder = await OrderModel.create(data);
      const populateOrder = await newOrder.populate(
        "userId",
        "_id username email address phone avatar"
      );
      return populateOrder;
    } catch (error) {
      throw new Error("Failed when create order" + error);
    }
  },

  async updateOrder(orderId: string, data: Partial<OrderType>) {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, data);
      return updatedOrder;
    } catch (error) {
      throw new Error("Failed when update order: " + error);
    }
  },

  async deleteOrder(orderId: string) {
    try {
      const deleteOrder = await OrderModel.findByIdAndDelete(orderId);
      return deleteOrder;
    } catch (error) {
      throw new Error("Failed when delete order " + error);
    }
  },
};
