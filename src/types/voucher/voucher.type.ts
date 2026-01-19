type VoucherDiscountType = "PERCENT" | "FIXED";

type TVoucher = {
  code: string;
  discountType: VoucherDiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;

  startAt?: Date;
  endAt?: Date;
  isActive: boolean;

  usageLimit?: number;
  usedCount: number;
  perUserLimit?: number;

  categoryIds?: string[];
  productIds?: string[];
  stackable?: boolean;
};
