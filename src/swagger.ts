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
            },
        },
    },
    // Nơi swagger-jsdoc sẽ tìm các comment `@openapi` để tự sinh `paths`.
    apis,
});
