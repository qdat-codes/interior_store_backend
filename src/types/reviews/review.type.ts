import { Document, Types } from "mongoose";

export interface ReviewType extends Document {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
}
