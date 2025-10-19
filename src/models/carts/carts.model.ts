import { model, Schema } from "mongoose";
import { CartType } from "../../types/index.type";

const cartSchema = new Schema<CartType>(
  {
    user: {
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<CartType>("Cart", cartSchema);
