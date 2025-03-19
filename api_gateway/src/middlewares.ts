import { NextFunction, Request, Response } from "express";

const auth = (role: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["authorization"]) {
      return res.status(401).json({ message: "Invalid authorization" });
    }

    // next function called
    next();
  };
};

const role = async (req: Request, res: Response, next: NextFunction) => {};

const middlewares = { auth: auth, role: role };
export default middlewares;
