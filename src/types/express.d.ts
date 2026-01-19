declare namespace Express {
  export interface Response {
    success(
      data: any,
      code?: string,
      message?: string,
      status?: number
    ): Response;
    error(code?: string, message?: string, status?: number): Response;
  }

  export interface Request {
    user: {
      id: string;
      role: string;
    };
  }
}
