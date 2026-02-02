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
 *     tags: [auth]
 *     summary: Đăng ký tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, username]
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Phạm Quốc Đạt"
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 example: "0909090909"
 *     responses:
 *       200:
 *         description: Tạo user thành công. refreshToken được lưu trong cookie (Set-Cookie header)
 *         headers:
 *           Set-Cookie:
 *             description: refreshToken được set vào cookie với tên "refreshToken"
 *             schema:
 *               type: string
 *               example: "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; SameSite=Lax; Max-Age=604800"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [user, accessToken]
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
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
 *                 accessToken:
 *                   type: string
 *                   description: Access token để xác thực các request tiếp theo
 *             example:
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               user:
 *                 _id: "696e496fb435d4a77e5662c4"
 *                 username: "Phạm Quốc Đạt"
 *                 email: "admin@gmail.com"
 *                 password: "$2b$10$PcdxDK/NNF1Dil1Smyq9hepJhf.qXyjVZTiIlzLiUO9onDNwB7YUy"
 *                 role: "USER"
 *                 favoriteProducts: []
 *                 createdAt: "2026-01-19T15:10:39.561Z"
 *                 updatedAt: "2026-01-19T15:10:39.561Z"
 *                 __v: 0
 *       400:
 *         description: email hoặc password không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [success, message]
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               message: "email or password is not valid"
 */
router.post("/register", authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [auth]
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
 *         description: Đăng nhập thành công. refreshToken được lưu trong cookie (Set-Cookie header)
 *         headers:
 *           Set-Cookie:
 *             description: refreshToken được set vào cookie với tên "refreshToken"
 *             schema:
 *               type: string
 *               example: "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; SameSite=Lax; Max-Age=604800"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [accessToken, user]
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token để xác thực các request tiếp theo
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
 *               user:
 *                 _id: "696e496fb435d4a77e5662c4"
 *                 email: "admin@gmail.com"
 *                 password: "$2b$10$PcdxDK/NNF1Dil1Smyq9hepJhf.qXyjVZTiIlzLiUO9onDNwB7YUy"
 *                 role: "USER"
 *                 favoriteProducts: []
 *                 createdAt: "2026-01-19T15:10:39.561Z"
 *                 updatedAt: "2026-01-19T15:10:39.561Z"
 *                 __v: 0
 *       401:
 *         description: email hoặc password không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [message]
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "email or password is not valid"
 */
router.post("/login", authController.login);

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     tags: [auth]
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
router.post("/refresh", authController.refreshToken);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [auth]
 *     summary: Logout
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
 *         description: Logout thành công. refreshToken cookie sẽ bị xóa
 *         headers:
 *           Set-Cookie:
 *             description: refreshToken cookie được xóa (Max-Age=0)
 *             schema:
 *               type: string
 *               example: "refreshToken=; HttpOnly; SameSite=Lax; Max-Age=0"
 *       400:
 *         description: Token không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [message]
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid refresh token"
 */
router.post("/logout", authController.logout);

export default router;
