import { NextFunction, Request, RequestHandler, Response } from "express";
import { Network } from "inspector/promises";

// export const asyncHandler =
//   (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };


export  const asyncHandler = (requestHandler:RequestHandler) => {
   return (req:Request, res:Response, next:NextFunction) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
   };
};