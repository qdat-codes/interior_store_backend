import express from "express";
import { authController } from "../../controllers/auth/auth.controller";

/**
 * Router cho nhóm endpoint `/api/auth`.
 *
 * Ghi chú Swagger:
 * - Viết doc bằng comment JSDoc `@openapi` ngay trên từng route.
 * - `swagger-jsdoc` sẽ quét file này (xem `src/swagger.ts`) và sinh OpenAPI paths.
 */
const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng ký tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Tạo user thành công
 *       500:
 *         description: Lỗi server
 */
router.post("/register", authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng nhập (trả accessToken + refreshToken + user)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [accessToken, refreshToken, user]
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                       description: "Hashed password (không nên trả về ở production)"
 *                     role:
 *                       type: string
 *                     favoriteProducts:
 *                       type: array
 *                       items:
 *                         type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     __v:
 *                       type: number
 *             example:
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 _id: "696e496fb435d4a77e5662c4"
 *                 email: "admin@gmail.com"
 *                 password: "$2b$10$PcdxDK/NNF1Dil1Smyq9hepJhf.qXyjVZTiIlzLiUO9onDNwB7YUy"
 *                 role: "USER"
 *                 favoriteProducts: []
 *                 createdAt: "2026-01-19T15:10:39.561Z"
 *                 updatedAt: "2026-01-19T15:10:39.561Z"
 *                 __v: 0
 *       500:
 *         description: Lỗi server
 */
router.post("/login", authController.login);

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *                 description: refreshToken
 *     responses:
 *       200:
 *         description: Trả access token mới
 *       400:
 *         description: Token không hợp lệ
 */
router.post("/refresh", authController.refresh);

export default router;
