export const PAYMENT_METHOD = {
    // Tiền mặt / thanh toán trực tiếp (thường dùng cho COD)
    CASH: "CASH",

    // Giữ lại để tương thích dữ liệu cũ
    CARD: "CARD",

    // Credit card
    CREDIT_CARD: "CREDIT_CARD",

    // Ví điện tử
    ZALOPAY: "ZALOPAY",

    // Ngân hàng nội địa (ATM/Internet Banking)
    DOMESTIC_BANK: "DOMESTIC_BANK",
} as const

export const SHIPPING_METHOD = {
    FREE: "FREE",
    STANDARD: "STANDARD",
    EXPRESS: "EXPRESS",
} as const

export const PAYMENT_STATUS = {
    PENDING: "PENDING",
    PAID: "PAID",
    FAILED: "FAILED",
} as const

export const ORDER_STATUS = {
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
} as const

export const USER_ROLE = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const
