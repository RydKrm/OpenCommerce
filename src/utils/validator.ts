import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

// Middleware to validate data using Zod schema
const validator = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.errors,
        });
      }
      res.status(500).json({
        success: false,
        message: "Something went wrong during validation",
      });
    }
  };
};

export default validator;
