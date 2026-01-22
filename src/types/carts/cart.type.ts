import { Types, Document } from "mongoose";

export interface CartType extends Document {
  userId: Types.ObjectId;
  items: CartItemType[];
}

export interface CartItemType {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  discountPrice?: number;
  color: string;
  size: string;
}
