import { Document, Types } from "mongoose";
import { ProductCategoryType } from "../index.type";

export interface ProductType extends Document {
  name: string;
  price: number;
  categoryId: Types.ObjectId;
  images: string[];
  stock: number;
  discountPrice: number;
  description: string;
}
