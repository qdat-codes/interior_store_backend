import OrderModel from "../../models/orders/order.model";
import { OrderItemsType, OrderType } from "../../types/index.type";

export const OrderRepository = {
  async getAllOrder(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const allOrder = await OrderModel.find()
        .populate("userId", "_id fisrtName lastName email address phone avatar")
        .populate("items.product", "_id name price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const total = await OrderModel.countDocuments();
      const totalPages = Math.ceil(total / limit);
      return {
        data: allOrder,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch (error) {
      throw new Error("Failed when get all order: " + error);
    }
  },

  async getOrderById(orderId: string) {
    try {
      const order = await OrderModel.findById(orderId)
        .populate("userId", "_id fisrtName lastName email address phone avatar")
        .populate("items.product", "_id name price images");
      return order;
    } catch (error) {
      throw new Error("Failed when get order by id: " + error);
    }
  },

  async getOrderByUserId(userId: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const orders = await OrderModel.find({ userId })
        .populate("items.product", "_id name price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const total = await OrderModel.countDocuments({ userId });
      const totalPages = Math.ceil(total / limit);
      return {
        data: orders,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch (error) {
      throw new Error("Failed when get order by userId: " + error);
    }
  },

  async getOrderBySearch(
    condition: {
      paymentMethod?: string;
      paymentStatus?: string;
      status?: string;
      shippingAddress?: string;
    },
    page: number = 1,
    limit: number = 10
  ) {
    try {
      const skip = (page - 1) * limit;
      const pageCondition: any = {};

      if (condition?.paymentMethod) {
        pageCondition.paymentMethod = condition.paymentMethod;
      }

      if (condition?.paymentStatus) {
        pageCondition.paymentStatus = condition.paymentStatus;
      }

      if (condition?.status) {
        pageCondition.status = condition.status;
      }

      if (condition?.shippingAddress) {
        pageCondition.shippingAddress = {
          $regex: condition.shippingAddress,
          $options: "i",
        };
      }

      const order = await OrderModel.find(pageCondition)
        .populate("userId", "_id fisrtName lastName email address phone avatar")
        .populate("items.product", "_id name price images")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await OrderModel.countDocuments(pageCondition);
      const totalPages = Math.ceil(total / limit);
      return {
        data: order,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch (error) {
      throw new Error("Failed when get order by condition: " + error);
    }
  },

  async createOrder(userId: string, data: OrderType) {
    try {
      if (!userId) throw new Error("Can't find userId");
      const orderData = { ...data, userId };
      const newOrder = await OrderModel.create(orderData);
      const populateOrder = await newOrder.populate(
        "userId",
        "_id fisrtName lastName email address phone avatar"
      );
      await populateOrder.populate("items.product", "_id name price images");
      return populateOrder;
    } catch (error) {
      throw new Error("Failed when create order" + error);
    }
  },

  async updateOrder(orderId: string, data: Partial<OrderType>) {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, data, { new: true })
        .populate("userId", "_id fisrtName lastName email address phone avatar")
        .populate("items.product", "_id name price images");
      if (!updatedOrder) throw new Error("Order not found");
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
