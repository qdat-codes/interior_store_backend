import express from "express";
import { UserController } from "../../controllers/user/user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

/**
 * Router cho nhóm endpoint `/api/user`.
 *
 * Ghi chú Swagger:
 * - Viết doc bằng comment JSDoc `@openapi` ngay trên từng route.
 * - `swagger-jsdoc` sẽ quét file này (xem `src/swagger.ts`) và sinh OpenAPI paths.
 */

const router = express.Router();

/**
 * @openapi
 * /api/user:
 *   get:
 *     tags: [user]
 *     summary: Lấy tất cả người dùng
 *     description: >
 *       Lấy tất cả người dùng với phân trang.
 *       Ví dụ: /api/user?page=1&limit=10
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
 *         description: Lấy danh sách người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/User"
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
 *       400:
 *         description: Lỗi khi lấy danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.get("/", authMiddleware, UserController.getAllUser);

/**
 * @openapi
 * /api/user/search:
 *   get:
 *     tags: [user]
 *     summary: Tìm kiếm người dùng
 *     description: Tìm kiếm người dùng theo email, username
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm
 *         example: "john"
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
 *         description: Tìm kiếm người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/User"
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
 *       400:
 *         description: search là bắt buộc
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.get("/search", authMiddleware, UserController.getUserBySearch);

/**
 * @openapi
 * /api/user/me:
 *   get:
 *     tags: [user]
 *     summary: Lấy thông tin người dùng hiện tại
 *     description: Lấy thông tin của người dùng đang đăng nhập (từ token)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: userId là bắt buộc
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.get("/me", authMiddleware, UserController.getUserById);

/**
 * @openapi
 * /api/user/me:
 *   patch:
 *     tags: [user]
 *     summary: Cập nhật thông tin người dùng hiện tại
 *     description: Cập nhật thông tin của người dùng đang đăng nhập
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fisrtName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "0909090909"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               avatar:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *           example:
 *             fisrtName: "John"
 *             lastName: "Doe"
 *             phone: "0909090909"
 *             address: "123 Main St, Anytown, USA"
 *             avatar: "https://example.com/avatar.jpg"
 *     responses:
 *       200:
 *         description: Cập nhật thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Lỗi khi cập nhật thông tin người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.patch("/me", authMiddleware, UserController.updateUser);

/**
 * @openapi
 * /api/user/me:
 *   delete:
 *     tags: [user]
 *     summary: Xóa tài khoản người dùng hiện tại
 *     description: Xóa tài khoản của người dùng đang đăng nhập
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa tài khoản thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessReponse"
 *       400:
 *         description: Lỗi khi xóa tài khoản
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.delete("/me", authMiddleware, UserController.deleteUser);

/**
 * @openapi
 * /api/user/favorites:
 *   get:
 *     tags: [user]
 *     summary: Lấy danh sách sản phẩm yêu thích
 *     description: Lấy danh sách sản phẩm yêu thích của người dùng đang đăng nhập
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
 *         description: Lấy danh sách sản phẩm yêu thích thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product"
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
 *       400:
 *         description: Lỗi khi lấy danh sách sản phẩm yêu thích
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.get("/favorites", authMiddleware, UserController.getAllFavoriteProduct);

/**
 * @openapi
 * /api/user/favorites/{productId}:
 *   post:
 *     tags: [user]
 *     summary: Thêm sản phẩm vào danh sách yêu thích
 *     description: Thêm sản phẩm vào danh sách yêu thích của người dùng đang đăng nhập
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm
 *         example: "696e496fb435d4a77e5662c5"
 *     responses:
 *       200:
 *         description: Thêm sản phẩm vào danh sách yêu thích thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Lỗi khi thêm sản phẩm vào danh sách yêu thích
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.post("/favorites/:productId", authMiddleware, UserController.addFavoriteProduct);

/**
 * @openapi
 * /api/user/favorites/{productId}:
 *   delete:
 *     tags: [user]
 *     summary: Xóa sản phẩm khỏi danh sách yêu thích
 *     description: Xóa sản phẩm khỏi danh sách yêu thích của người dùng đang đăng nhập
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sản phẩm
 *         example: "696e496fb435d4a77e5662c5"
 *     responses:
 *       200:
 *         description: Xóa sản phẩm khỏi danh sách yêu thích thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Lỗi khi xóa sản phẩm khỏi danh sách yêu thích
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 *       401:
 *         description: Không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.delete("/favorites/:productId", authMiddleware, UserController.removeFavoriteProduct);

export default router;
