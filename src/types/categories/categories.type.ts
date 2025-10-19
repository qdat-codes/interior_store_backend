import { Document } from "mongoose";

export interface ProductCategoryType extends Document {
  name: string;
  description: string;
}
