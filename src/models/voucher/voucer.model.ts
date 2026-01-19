import mongoose, { Schema } from "mongoose";

const voucherSchema = new Schema<TVoucher>({
    code: { type: String, required: true },
    discountType: { type: String, required: true },
    discountValue: { type: Number, required: true },
    minOrderAmount: { type: Number, required: false },
    maxDiscountAmount: { type: Number, required: false },
    startAt: { type: Date, required: false },
    endAt: { type: Date, required: false },
    isActive: { type: Boolean, required: true },
    usageLimit: { type: Number, required: false },
    usedCount: { type: Number, required: true },
    perUserLimit: { type: Number, required: false },
});

const VoucherModel = mongoose.model<TVoucher>("Voucher", voucherSchema);
export default VoucherModel;
