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
    voucherId: {
      type: Schema.Types.ObjectId,
      ref: "Voucher",
      default: null,
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
      default: null,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    isWaterResistant: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductType>("Product", productSchema);
export default ProductModel;
