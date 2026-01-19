import mongoose, { model, Schema } from "mongoose";
import { ProductCategoryType } from "../../types/index.type";

const categorySchema = new Schema<ProductCategoryType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<ProductCategoryType>(
  "Category",
  categorySchema
);
export default CategoryModel;
