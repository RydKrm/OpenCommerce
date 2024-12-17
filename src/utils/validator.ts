import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

// Middleware to validate data using Zod schema
const validator = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate request body against the Zod schema
      schema.parse(req.body);
      next(); // Continue to the controller if validation passes
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.errors, // Return detailed Zod validation errors
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
