import { Document, Types } from "mongoose";
import { OrderItemsType } from "../index.type";

export interface OrderType extends Document {
  user: Types.ObjectId;
  items: OrderItemsType[];
  totalAmount: number;
  paymentMethod: "CASH" | "CARD";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  shippingAddress: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
}
