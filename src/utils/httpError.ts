export class HttpError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string, cause?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;

    // Keep optional cause without requiring TS lib changes
    if (cause !== undefined) {
      (this as any).cause = cause;
    }
  }
}

