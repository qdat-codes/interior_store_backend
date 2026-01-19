import mongoose, { model, Schema } from "mongoose";
import { OrderItemsType } from "../../types/index.type";

const orderSchema = new Schema<OrderItemsType>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      require: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderItemModel = mongoose.model<OrderItemsType>("OrderItem", orderSchema);
export default OrderItemModel;
