import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth/auth.route";
import productRoutes from "./routes/product/product.route";
import categoryRoutes from "./routes/categories/category.route";
import reviewRoutes from "./routes/review/review.route";
import userRoutes from "./routes/user/user.route";
import cartRoutes from "./routes/cart/cart.route";
import orderRoutes from "./routes/order/order.route";
import { errorHandler } from "./middlewares/error.middleware";
import { responseHanlder } from "./middlewares/response.middleware";
import { swaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// khai báo chi tiết các loại status
app.use(responseHanlder);

// Swagger
app.get("/api-docs.json", (_req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// auth
app.use("/api/auth", authRoutes);
// user
app.use("/api/user", userRoutes);
// product
app.use("/api/product", productRoutes);
// category
app.use("/api/category", categoryRoutes);
// cart
app.use("/api/cart", cartRoutes);
// order
app.use("/api/order", orderRoutes);
// review
app.use("/api/review", reviewRoutes);
// middleware handle exception
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
