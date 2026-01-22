import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("Connected to databse: ", mongoose.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Không exit process trên serverless (Vercel) để function vẫn chạy được
    // Chỉ exit trên local development
    if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};
