import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // lấy token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.error(
        "NOT_FOUND_TOKEN",
        "Không tìm thấy token hoặc token không hợp lệ",
        404
      );
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("JWT_SECERT is not defined");
    }

    // giải mã token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;

    // gắn thông tin người dùng vào request
    req.user = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    next(error);
  }
};
