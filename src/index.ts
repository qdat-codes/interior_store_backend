import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database";
import authRoutes from "./routes/auth.route";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// auth
app.use("/api/auth", authRoutes);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Interior Store API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
