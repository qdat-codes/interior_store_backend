import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log full error for debugging
  console.error("Error:", err);
  return res.status(err.status || 500).json({
    success: false,
    message: err?.message || "Internal Server Error",
    code: err?.code,
  });
}
