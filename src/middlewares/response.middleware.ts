import { NextFunction, Response, Request } from "express";

export function responseHanlder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // success respone
  res.success = (
    data: any,
    code: string = "SUCCESS",
    message: string = "Success",
    status: number = 200
  ) => {
    return res.status(status).json({
      success: true,
      code,
      message,
      data,
      status,
    });
  };

  res.error = (
    code: string = "ERROR",
    message: string = "Something went wrong",
    status: number = 400
  ) => {
    return res.status(status).json({
      success: false,
      code,
      message,
      data: null,
    });
  };

  next();
}

// 201: created
// 204: no content (không trả data): như xóa
// 400: gửi request sai hoặc thiếu thông tin require
// 401: thiếu token
// 404: not found (không tìm thấy sản phẩm)
// 403: forbidden (không có quyền truy cập)
// 500: server error
