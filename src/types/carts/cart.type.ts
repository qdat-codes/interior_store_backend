import { Types, Document } from "mongoose";

export interface CartType extends Document {
  user: Types.ObjectId;
  items: CartItemType[];
}

export interface CartItemType {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  discountPrice: number;
}
