import express from "express";
import { OrderController } from "../../controllers/order/order.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

/**
 * Router cho nhóm endpoint `/api/order`.
 *
 * Ghi chú Swagger:
 * - Viết doc bằng comment JSDoc `@openapi` ngay trên từng route.
 * - `swagger-jsdoc` sẽ quét file này (xem `src/swagger.ts`) và sinh OpenAPI paths.
 */

const router = express.Router();

/**
 * @openapi
 * /api/order:
 *   get:
 *     tags: [order]
 *     summary: Lấy tất cả đơn hàng
 *     description: Lấy tất cả đơn hàng với phân trang
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng item mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     page:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     limit:
 *                       type: number
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.get("/", authMiddleware, OrderController.getAllOrder);

/**
 * @openapi
 * /api/order/search:
 *   get:
 *     tags: [order]
 *     summary: Tìm kiếm đơn hàng
 *     description: Tìm kiếm đơn hàng theo paymentMethod, paymentStatus, status, shippingAddress
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *           enum: [CASH, CARD, CREDIT_CARD, ZALOPAY, DOMESTIC_BANK]
 *         description: Phương thức thanh toán
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [PENDING, PAID, FAILED]
 *         description: Trạng thái thanh toán
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *         description: Trạng thái đơn hàng
 *       - in: query
 *         name: shippingAddress
 *         schema:
 *           type: string
 *         description: Địa chỉ giao hàng
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng item mỗi trang
 *     responses:
 *       200:
 *         description: Tìm kiếm đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     page:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     limit:
 *                       type: number
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.get("/search", authMiddleware, OrderController.getOrderBySearch);

/**
 * @openapi
 * /api/order/me:
 *   get:
 *     tags: [order]
 *     summary: Lấy đơn hàng của người dùng hiện tại
 *     description: Lấy danh sách đơn hàng của người dùng đang đăng nhập
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng item mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     page:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     limit:
 *                       type: number
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.get("/me", authMiddleware, OrderController.getOrderByUserId);

/**
 * @openapi
 * /api/order/{orderId}:
 *   get:
 *     tags: [order]
 *     summary: Lấy đơn hàng theo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đơn hàng
 *         example: "696e496fb435d4a77e5662c5"
 *     responses:
 *       200:
 *         description: Lấy đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: orderId là bắt buộc
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 *       404:
 *         description: Không tìm thấy đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.get("/:orderId", authMiddleware, OrderController.getOrderById);

/**
 * @openapi
 * /api/order:
 *   post:
 *     tags: [order]
 *     summary: Tạo đơn hàng mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, paymentMethod, paymentStatus, status]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [product, quantity, price, color, size]
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: "696e496fb435d4a77e5662c5"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 100000
 *                     discountPrice:
 *                       type: number
 *                       example: 90000
 *                     color:
 *                       type: string
 *                       example: "Red"
 *                     size:
 *                       type: string
 *                       example: "M"
 *               totalAmount:
 *                 type: number
 *                 example: 200000
 *               paymentMethod:
 *                 type: string
 *                 enum: [CASH, CARD, CREDIT_CARD, ZALOPAY, DOMESTIC_BANK]
 *                 example: "CASH"
 *               paymentStatus:
 *                 type: string
 *                 enum: [PENDING, PAID, FAILED]
 *                 example: "PENDING"
 *               shippingMethod:
 *                 type: string
 *                 enum: [FREE, STANDARD, EXPRESS]
 *                 example: "STANDARD"
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               status:
 *                 type: string
 *                 enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *                 example: "PENDING"
 *               note:
 *                 type: string
 *                 example: "Giao hàng vào buổi sáng"
 *           example:
 *             items:
 *               - product: "696e496fb435d4a77e5662c5"
 *                 quantity: 2
 *                 price: 100000
 *                 discountPrice: 90000
 *                 color: "Red"
 *                 size: "M"
 *             totalAmount: 200000
 *             paymentMethod: "CASH"
 *             paymentStatus: "PENDING"
 *             shippingMethod: "STANDARD"
 *             shippingAddress: "123 Main St, Anytown, USA"
 *             status: "PENDING"
 *             note: "Giao hàng vào buổi sáng"
 *     responses:
 *       201:
 *         description: Tạo đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: Lỗi khi tạo đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.post("/", authMiddleware, OrderController.createOrder);

/**
 * @openapi
 * /api/order/{orderId}:
 *   patch:
 *     tags: [order]
 *     summary: Cập nhật đơn hàng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đơn hàng
 *         example: "696e496fb435d4a77e5662c5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *               paymentStatus:
 *                 type: string
 *                 enum: [PENDING, PAID, FAILED]
 *               shippingAddress:
 *                 type: string
 *               note:
 *                 type: string
 *           example:
 *             status: "PROCESSING"
 *             paymentStatus: "PAID"
 *             shippingAddress: "456 New St, City, Country"
 *             note: "Đã thanh toán"
 *     responses:
 *       200:
 *         description: Cập nhật đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: Lỗi khi cập nhật đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.patch("/:orderId", authMiddleware, OrderController.updateOrder);

/**
 * @openapi
 * /api/order/{orderId}:
 *   delete:
 *     tags: [order]
 *     summary: Xóa đơn hàng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đơn hàng
 *         example: "696e496fb435d4a77e5662c5"
 *     responses:
 *       200:
 *         description: Xóa đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiSuccess"
 *       400:
 *         description: Lỗi khi xóa đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.delete("/:orderId", authMiddleware, OrderController.deleteOrder);

export default router;
