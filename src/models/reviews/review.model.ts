import mongoose, { Schema } from "mongoose";
import { ReviewType } from "../../types/index.type";

const reviewSchema = new Schema<ReviewType>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    min: 0,
  },
  comment: {
    type: String,
  },
});

const ReviewModel = mongoose.model<ReviewType>("Review", reviewSchema);
export default ReviewModel;
