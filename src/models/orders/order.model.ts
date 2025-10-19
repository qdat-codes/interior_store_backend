import { model, Schema } from "mongoose";
import { OrderType } from "../../types/index.type";

const orderSchema = new Schema<OrderType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requirede: true,
    },
    items: {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        require: true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model<OrderType>("Order", orderSchema);
