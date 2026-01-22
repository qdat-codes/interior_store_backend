import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

/**
 * File cấu hình Swagger/OpenAPI cho dự án.
 *
 * - `swagger-jsdoc` sẽ đọc các comment dạng JSDoc `@openapi` trong file routes/controllers
 *   để sinh ra JSON OpenAPI.
 * - `swagger-ui-express` (mount ở `src/index.ts`) dùng `swaggerSpec` để hiển thị UI tại `/api-docs`.
 *
 * Gợi ý: viết doc API ở các file route (vd: `src/routes/auth/auth.route.ts`)
 * vì route là nơi thể hiện rõ HTTP method + path + middleware.
 */

// Danh sách đường dẫn file cần quét comment `@openapi`.
// - Dev: quét file `.ts` trong `src/`
// - Prod (build): quét file `.js` trong `dist/` (khi chạy `node dist/index.js`)
const apis =
    process.env.NODE_ENV === "production"
        ? [path.join(__dirname, "routes/**/*.js"), path.join(__dirname, "controllers/**/*.js")]
        : [path.join(__dirname, "routes/**/*.ts"), path.join(__dirname, "controllers/**/*.ts")];

// Tự động detect server URL
const getServerUrl = () => {
    // Nếu có VERCEL_URL (Vercel tự động set biến này)
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    // Nếu có VERCEL (khi chạy trên Vercel)
    if (process.env.VERCEL === "1") {
        // Có thể set trong Vercel dashboard hoặc dùng default
        return process.env.PRODUCTION_URL || "https://interior-store-backend.vercel.app";
    }
    // Local development
    return "http://localhost:3009";
};

export const swaggerSpec = swaggerJSDoc({
    definition: {
        // Phiên bản chuẩn OpenAPI. (Swagger UI sẽ đọc JSON này)
        openapi: "3.0.3",
        info: {
            title: "Interior Store API",
            version: "1.0.0",
        },
        // Danh sách server base URL để Swagger UI gọi thử API.
        servers: [{ url: getServerUrl() }],
        // Các component dùng lại được (security schemes, schemas, ...)
        components: {
            // Khai báo cơ chế auth dạng Bearer token để Swagger UI hiện nút "Authorize".
            securitySchemes: {
                bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
            },
            schemas: {
                /**
                 * Schema phản hồi theo chuẩn middleware `res.success` / `res.error`
                 * (xem `src/middlewares/response.middleware.ts`).
                 */
                ApiSuccess: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        code: { type: "string", example: "SUCCESS" },
                        message: { type: "string", example: "Success" },
                        status: { type: "number", example: 200 },
                        data: {},
                    },
                    required: ["success", "code", "message", "status", "data"],
                },
                ApiError: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        code: { type: "string", example: "ERROR" },
                        message: { type: "string", example: "Something went wrong" },
                        data: { type: "null", example: null },
                    },
                    required: ["success", "code", "message", "data"],
                },
                // Các schema bên dưới là ví dụ cho phần Product (tham chiếu dùng lại trong nhiều endpoint).
                OverviewRow: {
                    type: "object",
                    properties: {
                        label: { type: "string", example: "Chất liệu" },
                        value: { type: "string", example: "Gỗ sồi" },
                    },
                    required: ["label", "value"],
                },
                OverviewSection: {
                    type: "object",
                    properties: {
                        title: { type: "string", example: "Thông tin" },
                        rows: { type: "array", items: { $ref: "#/components/schemas/OverviewRow" } },
                    },
                    required: ["title", "rows"],
                },
                Product: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        name: { type: "string", example: "Ghế sofa" },
                        price: { type: "number", example: 1200000 },
                        categoryId: { type: "string", example: "64a1b..." },
                        images: { type: "array", items: { type: "string" } },
                        stock: { type: "number", example: 10 },
                        voucherId: { type: "string", nullable: true, example: "64v..." },
                        description: { type: "string", nullable: true },
                        colors: { type: "array", items: { type: "string" }, example: ["Red", "Black"] },
                        sizes: { type: "array", items: { type: "string" }, example: ["S", "M"] },
                        overview: { type: "array", items: { $ref: "#/components/schemas/OverviewSection" } },
                        rate: { type: "number", example: 4.5 },
                        isWaterResistant: { type: "boolean", example: false },
                    },
                    required: ["name", "price", "categoryId", "stock", "colors", "sizes", "overview"],
                },
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        firstName: { type: "string", example: "john_doe" },
                        lastName: { type: "string", example: "doe" },
                        email: { type: "string", example: "john.doe@example.com" },
                        password: { type: "string", example: "password" },
                        role: { type: "string", example: "admin" },
                        phone: { type: "string", example: "0909090909" },
                        address: { type: "string", example: "123 Main St, Anytown, USA" },
                        avatar: { type: "string", example: "https://example.com/avatar.jpg" },
                        favoriteProducts: { type: "array", items: { type: "string" }, example: ["64d2f...", "64d2f..."] },
                        refreshToken: { type: "string", example: "64d2f..." },
                    },
                    required: ["firstName", "lastName", "email", "password", "role", "phone", "address", "avatar", "favoriteProducts", "refreshToken"],
                },
                Cart: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        userId: { type: "string", example: "64d2f..." },
                        items: { type: "array", items: { $ref: "#/components/schemas/CartItem" } },
                    },
                    required: ["userId", "items"],
                },
                CartItem: {
                    type: "object",
                    properties: {
                        product: { type: "string", example: "64d2f..." },
                        quantity: { type: "number", example: 1 },
                        price: { type: "number", example: 100000 },
                        discountPrice: { type: "number", example: 100000 },
                        color: { type: "string", example: "Red" },
                        size: { type: "string", example: "S" },
                    },
                    required: ["product", "quantity", "price", "discountPrice", "color", "size"],
                },
                Category: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        name: { type: "string", example: "Ghế sofa" },
                        description: { type: "string", example: "Ghế sofa" },
                    },
                    required: ["name", "description"],
                },
                Voucher: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        code: { type: "string", example: "123456" },
                        discountType: { type: "string", example: "percentage" },
                        discountValue: { type: "number", example: 10 },
                        minOrderAmount: { type: "number", example: 100000 },
                        maxDiscountAmount: { type: "number", example: 100000 },
                        startAt: { type: "string", example: "2021-01-01" },
                        endAt: { type: "string", example: "2021-01-01" },
                        isActive: { type: "boolean", example: true },
                        usageLimit: { type: "number", example: 100 },
                        usedCount: { type: "number", example: 0 },
                        perUserLimit: { type: "number", example: 1 },
                    },
                },
                Order: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        userId: { type: "string", example: "64d2f..." },
                        items: { type: "array", items: { $ref: "#/components/schemas/OrderItem" } },
                    },
                    required: ["userId", "items"],
                },
                OrderItem: {
                    type: "object",
                    properties: {
                        product: { type: "string", example: "64d2f..." },
                        quantity: { type: "number", example: 1 },
                        price: { type: "number", example: 100000 },
                        discountPrice: { type: "number", example: 100000 },
                        color: { type: "string", example: "Red" },
                        size: { type: "string", example: "S" },
                    },
                    required: ["product", "quantity", "price", "discountPrice", "color", "size"],
                },
                Review: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        userId: { type: "string", example: "64d2f..." },
                        productId: { type: "string", example: "64d2f..." },
                        rating: { type: "number", example: 5 },
                        comment: { type: "string", example: "Good product" },
                    },
                    required: ["userId", "productId", "rating", "comment"],
                }
            },
        },
    },
    // Nơi swagger-jsdoc sẽ tìm các comment `@openapi` để tự sinh `paths`.
    apis,
});
