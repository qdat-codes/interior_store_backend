import express from "express";
import { ReviewController } from "../../controllers/review/review.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

/**
 * Router cho nhóm endpoint `/api/review`.
 *
 * Ghi chú Swagger:
 * - Viết doc bằng comment JSDoc `@openapi` ngay trên từng route.
 * - `swagger-jsdoc` sẽ quét file này (xem `src/swagger.ts`) và sinh OpenAPI paths.
 */

const router = express.Router();

/**
 * @openapi
 * /api/review:
 *   get:
 *     tags: [review]
 *     summary: Lấy tất cả đánh giá hoặc tìm kiếm đánh giá
 *     description: >
 *       Lấy tất cả đánh giá với phân trang. Nếu có query parameter `search`, sẽ tìm kiếm theo comment.
 *       Ví dụ:
 *       - /api/review?page=1&limit=10 (lấy tất cả)
 *       - /api/review?page=1&limit=10&search=tốt (tìm kiếm)
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo comment (tùy chọn)
 *         example: "tốt"
 *     responses:
 *       200:
 *         description: Lấy đánh giá thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Review"
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
 *         description: Lỗi khi lấy đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.get("/", ReviewController.getAllReview);

/**
 * @openapi
 * /api/review/product/{productId}:
 *   get:
 *     tags: [review]
 *     summary: Lấy đánh giá theo productId
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
 *         description: Lấy đánh giá theo productId thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Review"
 *       400:
 *         description: productId là bắt buộc
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.get("/product/:productId", ReviewController.getReviewByProductId);

/**
 * @openapi
 * /api/review:
 *   post:
 *     tags: [review]
 *     summary: Tạo đánh giá mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, userId, rating, comment]
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "696e496fb435d4a77e5662c5"
 *               userId:
 *                 type: string
 *                 example: "696e496fb435d4a77e5662c4"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Sản phẩm rất tốt, chất lượng cao"
 *           example:
 *             productId: "696e496fb435d4a77e5662c5"
 *             userId: "696e496fb435d4a77e5662c4"
 *             rating: 5
 *             comment: "Sản phẩm rất tốt, chất lượng cao"
 *     responses:
 *       200:
 *         description: Tạo đánh giá thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 productId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 comment:
 *                   type: string
 *       400:
 *         description: Lỗi khi tạo đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.post("/", authMiddleware, ReviewController.createReview);

/**
 * @openapi
 * /api/review/{reviewId}:
 *   patch:
 *     tags: [review]
 *     summary: Cập nhật đánh giá
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đánh giá
 *         example: "696e496fb435d4a77e5662c5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *           example:
 *             rating: 4
 *             comment: "Sản phẩm tốt nhưng có thể cải thiện thêm"
 *     responses:
 *       200:
 *         description: Cập nhật đánh giá thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
 *       400:
 *         description: Lỗi khi cập nhật đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.patch("/:reviewId", authMiddleware, ReviewController.updateReview);

/**
 * @openapi
 * /api/review/{reviewId}:
 *   delete:
 *     tags: [review]
 *     summary: Xóa đánh giá
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đánh giá
 *         example: "696e496fb435d4a77e5662c5"
 *     responses:
 *       200:
 *         description: Xóa đánh giá thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessReponse"
 *       400:
 *         description: Lỗi khi xóa đánh giá
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.delete("/:reviewId", authMiddleware, ReviewController.deleteReview);

export default router;
