import { Types, Document } from "mongoose";

export interface OrderItemsType extends Document {
  order: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  price: number;
  subtotal: number;
}
