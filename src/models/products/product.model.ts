import mongoose, { model, Schema } from "mongoose";
import { ProductType } from "../../types/products/product.type";

const OverviewRowSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const OverviewSectionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    rows: { type: [OverviewRowSchema], default: [] },
  },
  { _id: false }
);

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
      type: [String],
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
    colors: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    overview: {
      type: [OverviewSectionSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductType>("Product", productSchema);
export default ProductModel;
