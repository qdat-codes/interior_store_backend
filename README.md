## Interior Store Backend

Backend cho dự án Interior Store, xây dựng bằng **Node.js + TypeScript + Express** và **MongoDB (Mongoose)**.

### Tech stack

- **Runtime**: Node.js
- **Framework**: Express (`express@5`)
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (`jsonwebtoken`)
- **Other**: `bcrypt`, `cors`, `dotenv`

### Yêu cầu

- Node.js (khuyến nghị bản LTS)
- MongoDB (local hoặc Atlas)

### Cài đặt

```bash
npm install
```

### Cấu hình môi trường

Tạo file `.env` tại thư mục root (cùng cấp `package.json`).

Ví dụ:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/interior_store

# Token secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Dùng cho auth middleware (xem lưu ý bên dưới)
JWT_SECRET=your_jwt_secret
```

### Chạy dự án

- **Development**:

```bash
npm run dev
```

- **Build**:

```bash
npm run build
```

- **Production**:

```bash
npm run start
```

Mặc định server chạy ở `http://localhost:3000` (hoặc theo `PORT`).

### Cấu trúc thư mục chính

```text
src/
  config/            # cấu hình (vd: kết nối DB)
  contants/          # hằng số (roles, ...)
  controllers/       # xử lý request/response
  middlewares/       # middleware (auth/authorize/response/error)
  models/            # mongoose schemas/models
  repositories/      # tầng truy cập dữ liệu
  routes/            # khai báo routes
  services/          # business logic
  types/             # typings dùng chung + mở rộng Express
  utils/             # helper (jwt, ...)
```

### Chuẩn response (middleware)

Middleware `src/middlewares/response.middleware.ts` gắn thêm vào `res`:

- **`res.success(data, code?, message?, status?)`**

```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "Success",
  "data": {},
  "status": 200
}
```

- **`res.error(code?, message?, status?)`**

```json
{
  "success": false,
  "code": "ERROR",
  "message": "Something went wrong",
  "data": null
}
```

Lưu ý: hiện tại một số endpoint (đặc biệt `auth` và vài endpoint `product`) vẫn trả JSON theo format khác (xem phần API).

### API

Base URL: `/api`

#### Auth (`/api/auth`)

- **POST** `/api/auth/register`
  - Body:
    - `username` (string)
    - `email` (string)
    - `password` (string)
  - Response: trả về user (JSON)

- **POST** `/api/auth/login`
  - Body:
    - `email` (string)
    - `password` (string)
  - Response:

```json
{
  "accessToken": "string",
  "refreshToken": "string",
  "user": {}
}
```

- **POST** `/api/auth/refresh`
  - Body:
    - `token` (refresh token)
  - Response: access token mới (JSON)

Ví dụ:

```bash
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@gmail.com\",\"password\":\"123456\"}"
```

#### Product (`/api/product`)

- **GET** `/api/product`
  - Protected: cần header `Authorization: Bearer <token>`
  - Query:
    - `page` (number, default 1)
    - `limit` (number, default 10)
  - Response: dùng `res.success(...)`

- **GET** `/api/product/:page/:limit`
  - Query filter:
    - `name` (string)
    - `categoryId` (string)
    - `minPrice` (number)
    - `maxPrice` (number)
  - Response:

```json
{ "data": {} }
```

- **POST** `/api/product`
  - Protected: cần header `Authorization: Bearer <token>`
  - Body: dữ liệu product (tùy theo schema)
  - Response:

```json
{ "data": {} }
```

- **PATCH** `/api/product/:id`
  - Protected
  - Response:

```json
{ "data": {} }
```

- **DELETE** `/api/product/:id`
  - Protected
  - Response:

```json
{ "data": {} }
```

Ví dụ gọi endpoint protected:

```bash
curl http://localhost:3000/api/product?page=1&limit=10 ^
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Lưu ý (theo code hiện tại)

- **JWT secrets đang dùng không đồng nhất**:
  - `src/utils/jwt.ts` dùng `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET`
  - `src/middlewares/auth.middleware.ts` verify bằng `JWT_SECRET`
  - Nếu bạn dùng access token tạo từ `ACCESS_TOKEN_SECRET` để gọi các route có `authMiddleware`, có thể sẽ fail do khác secret/payload. README này ghi đúng theo code, nhưng bạn nên thống nhất lại secrets/payload nếu muốn auth hoạt động xuyên suốt.

# interior_store_backend
