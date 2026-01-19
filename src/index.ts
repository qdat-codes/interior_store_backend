import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth/auth.route";
import productRoutes from "./routes/product/product.route";
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
//product
app.use("/api/product", productRoutes);

// middleware handle exception
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
