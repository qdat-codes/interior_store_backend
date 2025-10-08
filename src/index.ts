import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Interior Store API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
