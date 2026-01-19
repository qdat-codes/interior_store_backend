import { Document, Types } from "mongoose";
import { PAYMENT_METHOD, PAYMENT_STATUS, ORDER_STATUS, SHIPPING_METHOD } from "../../contants/contant";

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type ShippingMethod = (typeof SHIPPING_METHOD)[keyof typeof SHIPPING_METHOD];

export interface OrderType extends Document {
  userId: Types.ObjectId;
  items: OrderItemsType[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingMethod: ShippingMethod;
  shippingAddress?: string;
  status: OrderStatus;
  note?: string
}

export interface OrderItemsType {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  total: number;
  discountPrice?: number;
  color: string;
  size: string;
}
