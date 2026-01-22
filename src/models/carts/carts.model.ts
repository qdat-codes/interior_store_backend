import mongoose, { model, Schema } from "mongoose";
import { CartType } from "../../types/index.type";

const cartSchema = new Schema<CartType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          require: true,
          unique: true,
        },
        quantity: {
          type: Number,
          require: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          require: true,
        },
        discountPrice: {
          type: Number,
          require: false,
        },
        color: {
          type: String,
          require: true,
        },
        size: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model<CartType>("Cart", cartSchema);
export default CartModel;
