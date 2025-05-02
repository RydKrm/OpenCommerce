import createLog from "@/utils/logger";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  err.statusCode = err?.statusCode || 500;
  const errorId = new Date().getTime();

  const errorLogDetails = {
    errorId,
    name: err.name,
    cause: err.cause,
    statusCode: err.statusCode || 500,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  };

  createLog().write(JSON.stringify(errorLogDetails));
  console.log(errorLogDetails);

  if (err instanceof ZodError) {
    const zodErrorMessage = err.errors
      .map((item) => `${item.path.join(".")} is ${item.message}`)
      .join(", ");
    errorLogDetails.message = zodErrorMessage;
  }

  res.status(statusCode).json({
    statusCode: statusCode,
    message: errorLogDetails?.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
