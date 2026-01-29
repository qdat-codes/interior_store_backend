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

export const swaggerSpec = swaggerJSDoc({
    definition: {
        // Phiên bản chuẩn OpenAPI. (Swagger UI sẽ đọc JSON này)
        openapi: "3.0.3",
        info: {
            title: "Interior Store API",
            version: "1.0.0",
        },
        // Danh sách server base URL để Swagger UI gọi thử API.
        servers: [{ url: "http://localhost:3009" }],
        // Định nghĩa thứ tự hiển thị các tags trong Swagger UI
        // Thứ tự trong mảng này sẽ quyết định thứ tự hiển thị
        tags: [
            {
                name: "auth",

            },
            {
                name: "user",
            },
            {
                name: "product",
            },
            {
                name: "category",
            },
            {
                name: "cart",
            },
            {
                name: "order",
            },
            {
                name: "review",
            },
        ],
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
                SuccessReponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        code: { type: "string", example: "SUCCESS" },
                        message: { type: "string", example: "Success" },
                        status: { type: "number", example: 200 },
                        data: { type: "null", example: null },
                    },
                    required: ["success", "code", "message", "status", "data"],
                },
                ErrorReponse: {
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
                // Auth Schemas
                SignupRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", example: "admin@gmail.com", format: "email" },
                        password: { type: "string", example: "123456", minLength: 6, description: "Password must be at least 6 characters" },
                    },
                },
                SignupResponse: {
                    type: "object",
                    required: ["user"],
                    properties: {
                        user: {
                            type: "object",
                            properties: {
                                _id: { type: "string", example: "696e496fb435d4a77e5662c4" },
                                email: { type: "string", example: "admin@gmail.com" },
                                password: { type: "string", example: "$2b$10$PcdxDK/NNF1Dil1Smyq9hepJhf.qXyjVZTiIlzLiUO9onDNwB7YUy", description: "Hashed password" },
                                role: { type: "string", example: "USER" },
                                favoriteProducts: { type: "array", items: { type: "string" }, example: [] },
                                createdAt: { type: "string", format: "date-time", example: "2026-01-19T15:10:39.561Z" },
                                updatedAt: { type: "string", format: "date-time", example: "2026-01-19T15:10:39.561Z" },
                                __v: { type: "number", example: 0 },
                            },
                        },
                    },
                },
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", example: "admin@gmail.com" },
                        password: { type: "string", example: "123456" },
                    },
                },
                LoginResponse: {
                    type: "object",
                    required: ["accessToken", "refreshToken", "user"],
                    properties: {
                        accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                        refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                        user: { $ref: "#/components/schemas/User" },
                    },
                },
                // User Schemas
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        firstName: { type: "string", example: "john_doe" },
                        lastName: { type: "string", example: "doe" },
                        fullname: { type: "string", example: "john doe" },
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
                CreateUserRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", example: "user@example.com" },
                        password: { type: "string", example: "password123", minLength: 6, description: "Password must be at least 6 characters" },
                        fisrtName: { type: "string", example: "John" },
                        lastName: { type: "string", example: "Doe" },
                        phone: { type: "string", example: "0909090909" },
                        address: { type: "string", example: "123 Main St" },
                        avatar: { type: "string", example: "https://example.com/avatar.jpg" },
                        role: { type: "string", example: "USER", enum: ["USER", "ADMIN"] },
                    },
                },
                UpdateUserRequest: {
                    type: "object",
                    properties: {
                        fisrtName: { type: "string", example: "John" },
                        lastName: { type: "string", example: "Doe" },
                        phone: { type: "string", example: "0909090909" },
                        address: { type: "string", example: "123 Main St, Anytown, USA" },
                        avatar: { type: "string", example: "https://example.com/avatar.jpg" },
                    },
                },
                DeleteUserResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "User deleted successfully" },
                    },
                },
                // Product Schemas
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
                CreateProductRequest: {
                    type: "object",
                    required: ["name", "price", "categoryId", "stock", "colors", "sizes", "overview"],
                    properties: {
                        name: { type: "string", example: "Ghế sofa" },
                        description: { type: "string", example: "Ghế sofa đẹp" },
                        price: { type: "number", example: 1200000 },
                        categoryId: { type: "string", example: "64a1b..." },
                        images: { type: "array", items: { type: "string" }, example: ["https://example.com/image1.jpg"] },
                        stock: { type: "number", example: 10 },
                        voucherId: { type: "string", nullable: true, example: "64v..." },
                        colors: { type: "array", items: { type: "string" }, example: ["Red", "Black"] },
                        sizes: { type: "array", items: { type: "string" }, example: ["S", "M", "L"] },
                        overview: { type: "array", items: { $ref: "#/components/schemas/OverviewSection" } },
                        isWaterResistant: { type: "boolean", example: false },
                    },
                },
                UpdateProductRequest: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Ghế sofa" },
                        description: { type: "string", example: "Ghế sofa đẹp" },
                        price: { type: "number", example: 1200000 },
                        categoryId: { type: "string", example: "64a1b..." },
                        images: { type: "array", items: { type: "string" } },
                        stock: { type: "number", example: 10 },
                        voucherId: { type: "string", nullable: true },
                        colors: { type: "array", items: { type: "string" } },
                        sizes: { type: "array", items: { type: "string" } },
                        overview: { type: "array", items: { $ref: "#/components/schemas/OverviewSection" } },
                        isWaterResistant: { type: "boolean", example: false },
                    },
                },
                DeleteProductResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Product deleted successfully" },
                    },
                },
                // Cart Schemas
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
                        quantity: { type: "number", example: 1, minimum: 1 },
                        price: { type: "number", example: 1200000 },
                        discountPrice: { type: "number", example: 1000000 },
                        color: { type: "string", example: "Red" },
                        size: { type: "string", example: "L" },
                    },
                    required: ["product", "quantity", "price", "color", "size"],
                },
                CreateCartRequest: {
                    type: "object",
                    required: ["items"],
                    properties: {
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/CartItem" },
                        },
                    },
                },
                UpdateCartRequest: {
                    type: "object",
                    required: ["items"],
                    properties: {
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/CartItem" },
                        },
                    },
                },
                DeleteCartResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Cart deleted successfully" },
                    },
                },
                // Order Schemas
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
                CreateOrderRequest: {
                    type: "object",
                    required: ["items"],
                    properties: {
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/OrderItem" },
                        },
                        shippingAddress: { type: "string", example: "123 Main St, Anytown, USA" },
                        paymentMethod: { type: "string", example: "credit_card" },
                        voucherCode: { type: "string", nullable: true, example: "DISCOUNT10" },
                    },
                },
                UpdateOrderRequest: {
                    type: "object",
                    properties: {
                        status: { type: "string", example: "processing", enum: ["pending", "processing", "shipped", "delivered", "cancelled"] },
                        shippingAddress: { type: "string", example: "123 Main St, Anytown, USA" },
                        paymentMethod: { type: "string", example: "credit_card" },
                    },
                },
                DeleteOrderResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Order deleted successfully" },
                    },
                },
                // Review Schemas
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
                },
                CreateReviewRequest: {
                    type: "object",
                    required: ["productId", "rating", "comment"],
                    properties: {
                        productId: { type: "string", example: "64d2f..." },
                        rating: { type: "number", example: 5, minimum: 1, maximum: 5 },
                        comment: { type: "string", example: "Good product" },
                    },
                },
                UpdateReviewRequest: {
                    type: "object",
                    properties: {
                        rating: { type: "number", example: 4, minimum: 1, maximum: 5 },
                        comment: { type: "string", example: "Updated comment" },
                    },
                },
                DeleteReviewResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Review deleted successfully" },
                    },
                },
                // Category Schemas
                Category: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "64d2f..." },
                        name: { type: "string", example: "Ghế sofa" },
                        description: { type: "string", example: "Ghế sofa" },
                    },
                    required: ["name", "description"],
                },
                CreateCategoryRequest: {
                    type: "object",
                    required: ["name", "description"],
                    properties: {
                        name: { type: "string", example: "Ghế sofa" },
                        description: { type: "string", example: "Danh mục ghế sofa" },
                    },
                },
                UpdateCategoryRequest: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Ghế sofa" },
                        description: { type: "string", example: "Danh mục ghế sofa" },
                    },
                },
                DeleteCategoryResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Category deleted successfully" },
                    },
                },
                // Voucher Schemas
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
                CreateVoucherRequest: {
                    type: "object",
                    required: ["code", "discountType", "discountValue", "startAt", "endAt"],
                    properties: {
                        code: { type: "string", example: "DISCOUNT10" },
                        discountType: { type: "string", example: "percentage", enum: ["percentage", "fixed"] },
                        discountValue: { type: "number", example: 10 },
                        minOrderAmount: { type: "number", example: 100000 },
                        maxDiscountAmount: { type: "number", example: 100000 },
                        startAt: { type: "string", format: "date-time", example: "2024-01-01T00:00:00Z" },
                        endAt: { type: "string", format: "date-time", example: "2024-12-31T23:59:59Z" },
                        isActive: { type: "boolean", example: true },
                        usageLimit: { type: "number", example: 100 },
                        perUserLimit: { type: "number", example: 1 },
                    },
                },
                UpdateVoucherRequest: {
                    type: "object",
                    properties: {
                        code: { type: "string", example: "DISCOUNT10" },
                        discountType: { type: "string", enum: ["percentage", "fixed"] },
                        discountValue: { type: "number", example: 10 },
                        minOrderAmount: { type: "number", example: 100000 },
                        maxDiscountAmount: { type: "number", example: 100000 },
                        startAt: { type: "string", format: "date-time" },
                        endAt: { type: "string", format: "date-time" },
                        isActive: { type: "boolean", example: true },
                        usageLimit: { type: "number", example: 100 },
                        perUserLimit: { type: "number", example: 1 },
                    },
                },
                DeleteVoucherResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Voucher deleted successfully" },
                    },
                },
            },
        },
    },
    // Nơi swagger-jsdoc sẽ tìm các comment `@openapi` để tự sinh `paths`.
    apis,
});
