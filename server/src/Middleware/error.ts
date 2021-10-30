import type { Request, Response } from "express";
import assert from "http-assert";

interface IResponseWithError extends Response {
  message: string;
  code: number;
  name: string;
  errors: { [message: string]: string[] };
}

const errorHandler = (
  err: IResponseWithError,
  req: Request,
  res: Response,
  next: Function
) => {
  let error = { ...err };
  error.message = err.message;
  assert(err.code === 11000, 400, "Duplicate Entry");
  assert(
    err.name === "ValidationError",
    400,
    Object.values(err.errors).map((x) => x)
  );

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Internal Server Error",
  });
};

export default errorHandler;
