import express from "express";
import { CategoryController } from "../../controllers/category/category.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

/**
 * Router cho nhóm endpoint `/api/categories`.
 *
 * Ghi chú Swagger:
 * - Viết doc bằng comment JSDoc `@openapi` ngay trên từng route.
 * - `swagger-jsdoc` sẽ quét file này (xem `src/swagger.ts`) và sinh OpenAPI paths.
 */

const router = express.Router();

/**
 * @openapi
 * /api/category:
 *   get:
 *     tags:
 *       - category
 *     summary: Lấy tất cả danh mục
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
 *         description: Lấy tất cả danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Category"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *       400:
 *         description: Lỗi khi lấy danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */

router.get("/", CategoryController.getAllCategory);

/** 
 * @openapi
 * /api/category/{id}:
 *   get:
 *     tags:
 *       - category
 *     summary: Lấy danh mục theo điều kiện
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         description: tên của danh mục
 * 
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Mô tả danh mục
 *       - in: query
 *         name: limit
 *         schema:
 *     responses:
 *       200:
 *         description: Lấy danh mục theo điều kiện thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
/**
 * @openapi
 * /api/category/search:
 *   get:
 *     tags:
 *       - category
 *     summary: Tìm kiếm danh mục
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm theo tên danh mục
 *         example: "Ghế"
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
 *         description: Tìm kiếm danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Category"
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
 *         description: Lỗi khi tìm kiếm danh mục
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.get("/search", CategoryController.getCategoryBySearch);
/**
 * @openapi
 * /api/category:
 *   post:
 *     tags:
 *       - category
 *     summary: Tạo danh mục mới
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ghế sofa"
 *               description:
 *                 type: string
 *                 example: "Danh mục các loại ghế sofa"
 *           example:
 *             name: "Ghế sofa"
 *             description: "Danh mục các loại ghế sofa"
 *     responses:
 *       201:
 *         description: Tạo danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       400:
 *         description: Lỗi khi tạo danh mục
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
router.post("/", authMiddleware, CategoryController.createNewCategory);
/**
 * @openapi
 * /api/category/{id}:
 *   put:
 *     tags:
 *       - category
 *     summary: Cập nhật danh mục
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục
 *         example: "696e496fb435d4a77e5662c5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ghế sofa (updated)"
 *               description:
 *                 type: string
 *                 example: "Danh mục các loại ghế sofa đã cập nhật"
 *           example:
 *             name: "Ghế sofa (updated)"
 *             description: "Danh mục các loại ghế sofa đã cập nhật"
 *     responses:
 *       200:
 *         description: Cập nhật danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       400:
 *         description: Lỗi khi cập nhật danh mục
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
 *       404:
 *         description: Không tìm thấy danh mục
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.put("/:id", authMiddleware, CategoryController.updateCategory);
/**
 * @openapi
 * /api/category/{id}:
 *   delete:
 *     tags:
 *       - category
 *     summary: Xóa danh mục
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục
 *         example: "696e496fb435d4a77e5662c5"
 *     responses:
 *       200:
 *         description: Xóa danh mục thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       400:
 *         description: Lỗi khi xóa danh mục
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
 *       404:
 *         description: Không tìm thấy danh mục
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApiError"
 */
router.delete("/:id", authMiddleware, CategoryController.deleteCategory);

export default router;
