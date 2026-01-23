import express from "express";
import { CartController } from "../../controllers/cart/cart.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

/**
 * Router cho nhóm endpoint `/api/cart`.
 *
 * Ghi chú Swagger:
 * - Viết doc bằng comment JSDoc `@openapi` ngay trên từng route.
 * - `swagger-jsdoc` sẽ quét file này (xem `src/swagger.ts`) và sinh OpenAPI paths.
 */

const router = express.Router();

/**
 * @openapi
 * /api/cart:
 *   get:
 *     tags: [cart]
 *     summary: Lấy giỏ hàng của user hiện tại
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "696e496fb435d4a77e5662c4"
 *                 userId:
 *                   type: string
 *                   example: "696e496fb435d4a77e5662c5"
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/CartItem"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               _id: "696e496fb435d4a77e5662c4"
 *               userId: "696e496fb435d4a77e5662c5"
 *               items:
 *                 - product:
 *                     _id: "696e496fb435d4a77e5662c6"
 *                     name: "Ghế sofa"
 *                     price: 1200000
 *                     images: ["image1.jpg"]
 *                   quantity: 2
 *                   price: 1200000
 *                   discountPrice: 1000000
 *                   color: "Red"
 *                   size: "L"
 *               createdAt: "2026-01-19T15:10:39.561Z"
 *               updatedAt: "2026-01-19T15:10:39.561Z"
 *       400:
 *         description: userId không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "userId is required"
 */
router.get("/", authMiddleware, CartController.getCart);

/**
 * @openapi
 * /api/cart:
 *   post:
 *     tags: [cart]
 *     summary: Tạo giỏ hàng mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [product, quantity, price, color, size]
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: "696e496fb435d4a77e5662c6"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                       minimum: 1
 *                     price:
 *                       type: number
 *                       example: 1200000
 *                     discountPrice:
 *                       type: number
 *                       example: 1000000
 *                     color:
 *                       type: string
 *                       example: "Red"
 *                     size:
 *                       type: string
 *                       example: "L"
 *           example:
 *             items:
 *               - product: "696e496fb435d4a77e5662c6"
 *                 quantity: 2
 *                 price: 1200000
 *                 discountPrice: 1000000
 *                 color: "Red"
 *                 size: "L"
 *     responses:
 *       201:
 *         description: Tạo giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: items array không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "items array is required"
 */
router.post("/", authMiddleware, CartController.createCart);

/**
 * @openapi
 * /api/cart:
 *   put:
 *     tags: [cart]
 *     summary: Cập nhật toàn bộ giỏ hàng
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [product, quantity, price, color, size]
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: "696e496fb435d4a77e5662c6"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                       minimum: 1
 *                     price:
 *                       type: number
 *                       example: 1200000
 *                     discountPrice:
 *                       type: number
 *                       example: 1000000
 *                     color:
 *                       type: string
 *                       example: "Red"
 *                     size:
 *                       type: string
 *                       example: "L"
 *           example:
 *             items:
 *               - product: "696e496fb435d4a77e5662c6"
 *                 quantity: 2
 *                 price: 1200000
 *                 discountPrice: 1000000
 *                 color: "Red"
 *                 size: "L"
 *     responses:
 *       200:
 *         description: Cập nhật giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: items array không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "items array is required"
 */
router.put("/", authMiddleware, CartController.updateCart);

/**
 * @openapi
 * /api/cart/item:
 *   post:
 *     tags: [cart]
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [product, quantity, price, color, size]
 *             properties:
 *               product:
 *                 type: string
 *                 example: "696e496fb435d4a77e5662c6"
 *               quantity:
 *                 type: number
 *                 example: 1
 *                 minimum: 1
 *               price:
 *                 type: number
 *                 example: 1200000
 *               discountPrice:
 *                 type: number
 *                 example: 1000000
 *               color:
 *                 type: string
 *                 example: "Red"
 *               size:
 *                 type: string
 *                 example: "L"
 *           example:
 *             product: "696e496fb435d4a77e5662c6"
 *             quantity: 1
 *             price: 1200000
 *             discountPrice: 1000000
 *             color: "Red"
 *             size: "L"
 *     responses:
 *       200:
 *         description: Thêm sản phẩm vào giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Thông tin sản phẩm không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "product, quantity, price, color, size are required"
 */
router.post("/item", authMiddleware, CartController.addItemToCart);

/**
 * @openapi
 * /api/cart/item/{productId}:
 *   patch:
 *     tags: [cart]
 *     summary: Cập nhật số lượng sản phẩm trong giỏ hàng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: "696e496fb435d4a77e5662c6"
 *         description: ID của sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [color, size, quantity]
 *             properties:
 *               color:
 *                 type: string
 *                 example: "Red"
 *               size:
 *                 type: string
 *                 example: "L"
 *               quantity:
 *                 type: number
 *                 example: 3
 *                 minimum: 0
 *                 description: "Nếu quantity = 0, sản phẩm sẽ bị xóa khỏi giỏ hàng"
 *           example:
 *             color: "Red"
 *             size: "L"
 *             quantity: 3
 *     responses:
 *       200:
 *         description: Cập nhật số lượng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Thông tin không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "productId, color, size, quantity are required"
 */
router.patch("/item/:productId", authMiddleware, CartController.updateItemQuantity);

/**
 * @openapi
 * /api/cart/item/{productId}:
 *   delete:
 *     tags: [cart]
 *     summary: Xóa sản phẩm khỏi giỏ hàng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: "696e496fb435d4a77e5662c6"
 *         description: ID của sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [color, size]
 *             properties:
 *               color:
 *                 type: string
 *                 example: "Red"
 *               size:
 *                 type: string
 *                 example: "L"
 *           example:
 *             color: "Red"
 *             size: "L"
 *     responses:
 *       200:
 *         description: Xóa sản phẩm khỏi giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Thông tin không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "productId, color, size are required"
 */
router.delete("/item/:productId", authMiddleware, CartController.removeItemFromCart);

/**
 * @openapi
 * /api/cart/clear:
 *   delete:
 *     tags: [cart]
 *     summary: Xóa tất cả sản phẩm trong giỏ hàng (giữ lại giỏ hàng)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa tất cả sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: userId không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "userId is required"
 */
router.delete("/clear", authMiddleware, CartController.clearCart);

/**
 * @openapi
 * /api/cart:
 *   delete:
 *     tags: [cart]
 *     summary: Xóa toàn bộ giỏ hàng
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: userId không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "userId is required"
 */
router.delete("/", authMiddleware, CartController.deleteCart);

export default router;
