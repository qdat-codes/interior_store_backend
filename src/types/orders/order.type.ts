import { Document, Types } from "mongoose";
import { OrderItemsType } from "../index.type";
import { PAYMENT_METHOD, PAYMENT_STATUS, ORDER_STATUS } from "../../contants/contant";

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface OrderType extends Document {
  userId: Types.ObjectId;
  items: OrderItemsType[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress?: string;
  status: OrderStatus;
  note?: string
}
