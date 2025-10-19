import { model, Schema } from "mongoose";
import { ProductType } from "../../types/index.type";

const productSchema = new Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: {
      type: [],
    },
    stock: {
      type: Number,
      min: 0,
      required: true,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ProductType>("Product", productSchema);
