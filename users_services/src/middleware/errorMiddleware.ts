import createLog from "@/utils/logger";
import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;

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
  let message: any = "";
  let status: any;

  if (err instanceof ZodError) {
    statusCode = 400;
    const zodErrorMessage = err.errors
      .map((item) => `${item.path.join(".")} is ${item.message}`)
      .join(", ");
    errorLogDetails.message = zodErrorMessage;
    console.log("ZOD Error Message ", zodErrorMessage)
  }else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("33333333333333333_________________________", err);
      message = err?.meta?.cause;
      if (err.code === "P2002") {
         status = StatusCodes.CONFLICT;
         message = `Unique constraint failed on the field: ${err.meta?.target}`;
      } else if (err.code == "P2025") {
         status = StatusCodes.NOT_FOUND;
      }
   } else if (err instanceof Prisma.PrismaClientValidationError) {
      console.log("4444444444444444444 error_________________________", err?.message);
      status = StatusCodes.UNPROCESSABLE_ENTITY;
      message = err?.message;
   } else if (err instanceof Error) {
      console.log("222222222222222_", err);
      message = err.message;
   } else {
      console.log("err__", err);
   }

  res.status(statusCode).json({
    statusCode: statusCode,
    message: errorLogDetails?.message,
    stack: process.env.NODE_ENV === "prod" ? null : err.stack,
  });
};
