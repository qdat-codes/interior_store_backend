import { model, Schema } from "mongoose";
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
    image: [],
  },
  {
    timestamps: true,
  }
);

export default model<ProductCategoryType>("Categories", categorySchema);
