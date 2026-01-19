import { NextFunction, Request, Response } from "express";

// dùng cho nếu có nhiều loại user
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.error(
        "CAN_NOT_PERMISSION",
        "Không có quyền truy cập tài nguyên",
        403
      );
    }

    next();
  };
};
