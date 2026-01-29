import express from "express";
import { ProductController } from "../../controllers/product/product.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

/**
 * Router cho nhóm endpoint `/api/product`.
 *
 * Ghi chú Swagger:
 * - Viết doc bằng comment JSDoc `@openapi` ngay trên từng route.
 * - `swagger-jsdoc` sẽ quét file này (xem `src/swagger.ts`) và sinh OpenAPI paths.
 */

const router = express.Router();

/**
 * @openapi
 * /api/product:
 *   get:
 *     tags: [product]
 *     summary: Lấy tất cả sản phẩm
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
 *         description: Lấy tất cả sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product"
 *       404:
 *         description: Không tìm thấy sản phẩm
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
router.get("/", ProductController.getAllProduct);

/**
 * @openapi
 * /api/product/search:
 *   get:
 *     tags: [product]
 *     summary: Lấy sản phẩm theo điều kiện
 *     description: >
 *       Ví dụ:
 *       /api/product/search?page=1&limit=10&name=Sản%20phẩm%201&categoryId=696e...&minPrice=100000&maxPrice=1000000
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng item mỗi trang
 *         example: 10
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tìm theo tên
 *         example: "Sản phẩm 1"
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Lọc theo categoryId
 *         example: "696e496fb435d4a77e5662c5"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Giá tối thiểu
 *         example: 100000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Giá tối đa
 *         example: 1000000
 *     responses:
 *       200:
 *         description: Lấy sản phẩm theo điều kiện thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 */

router.get("/search", ProductController.getProductBySearch);


/** 
 * @openapi
 * /api/product:
 *   post:
 *      tags: [product]
 *      summary: Tạo sản phẩm
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                price:
 *                  type: number
 *                categoryId:
 *                  type: string
 *                images:
 *                  type: array
 *                  items:
 *                    type: string
 *                stock:
 *                  type: number
 *                voucherId:
 *                  type: string
 *                colors:
 *                  type: array
 *                  items:
 *                    type: string
 *                sizes:
 *                  type: array
 *                  items:
 *                    type: string
 *                overview:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      title:
 *                        type: string
 *                      rows:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            label:
 *                              type: string
 *                            value:
 *                              type: string
 *                rate:
 *                  type: number
 *                isWaterResistant:
 *                  type: boolean
 *            example:
 *             name: "Sản phẩm 2"
 *             description: "Mô tả sản phẩm 1"
 *             price: 100000
 *             categoryId: "696e496fb435d4a77e5662c5"
 *             images: ["image1.jpg", "image2.jpg"]
 *             stock: 100
 *             voucherId: "696e496fb435d4a77e5662c6"
 *             colors: ["red", "blue"]
 *             sizes: ["S", "M", "L"]
 *             overview:
 *               - title: "Thông số kỹ thuật"
 *                 rows:
 *                   - label: "Tổng thế"
 *                     value: "Cao 32,7'' Rộng 89'' Sâu 35''"
 *                   - label: "Ghế"
 *                     value: "Cao 18,5'' Rộng 24,8'' Sâu 21,6''"
 *             rate: 4.5
 *             isWaterResistant: true
 *      responses:
 *       200:
 *         description: Tạo sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     categoryId:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     stock:
 *                       type: number
 *                     voucherId:
 *                       type: string
 *                     colors:
 *                       type: array
 *                       items:
 *                         type: string
 *                     sizes:
 *                       type: array
 *                       items:
 *                         type: string
 *                     overview:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                           rows:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 label:
 *                                   type: string
 *                                 value:
 *                                   type: string
 *                     rate:
 *                       type: number
 *                     isWaterResistant:
 *                       type: boolean
 *             example:
 *              data:
 *                _id: "696e496fb435d4a77e5662c4"
 *                name: "Sản phẩm 1"
 *                description: "Mô tả sản phẩm 1"
 *                price: 100000
 *                categoryId: "696e496fb435d4a77e5662c5"
 *                images: ["image1.jpg", "image2.jpg"]
 *                stock: 100
 *                voucherId: "696e496fb435d4a77e5662c6"
 *                colors: ["red", "blue"]
 *                sizes: ["S", "M", "L"]
 *                overview:
 *                  - title: "Thông số kỹ thuật"
 *                    rows:
 *                      - label: "Tổng thế"
 *                        value: "Cao 32,7'' Rộng 89'' Sâu 35''"
 *                      - label: "Ghế"
 *                        value: "Cao 18,5'' Rộng 24,8'' Sâu 21,6''"
 *                rate: 4.5
 *                isWaterResistant: true
 *       400:
 *         description: Lỗi khi tạo sản phẩm
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

router.post("/", authMiddleware, ProductController.createProduct);

/**
 * @openapi
 * /api/product/{id}:
 *   patch:
 *     tags: [product]
 *     summary: Cập nhật sản phẩm
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               stock:
 *                 type: number
 *               voucherId:
 *                 type: string
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *               overview:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/OverviewSection"
 *               rate:
 *                 type: number
 *               isWaterResistant:
 *                 type: boolean
 *           example:
 *             name: "Sản phẩm 1 (updated)"
 *             price: 150000
 *             stock: 50
 *     responses:
 *       200:
 *         description: Cập nhật sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Product"
 *       400:
 *         description: Lỗi khi cập nhật sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */

router.patch("/:id", authMiddleware, ProductController.updateProduct);

/**
 * @openapi
 * /api/product/{id}:
 *   delete:
 *     tags: [product]
 *     summary: Xóa sản phẩm
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "696e496fb435d4a77e5662c5"
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: Xóa sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SuccessReponse"
 *       400:
 *         description: Lỗi khi xóa sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorReponse"
 */
router.delete("/:id", authMiddleware, ProductController.deleteProduct);

export default router;
