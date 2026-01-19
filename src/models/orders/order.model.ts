import mongoose, { model, Schema } from "mongoose";
import { OrderType } from "../../types/index.type";
import { ORDER_STATUS, PAYMENT_METHOD, PAYMENT_STATUS } from "../../contants/contant";

const orderSchema = new Schema<OrderType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requirede: true,
    },
    items: [
      {
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
    ],
    note: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(ORDER_STATUS),
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: Object.values(PAYMENT_METHOD),
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: Object.values(PAYMENT_STATUS),
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderType>("Order", orderSchema);

export default OrderModel;
