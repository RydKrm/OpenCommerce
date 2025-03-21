import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import IRequest from "./types";
import { ROLES } from "./role";

const auth = (role: string[] = []) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    if (!req.headers["authorization"]) {
      return res.status(401).json({ message: "Invalid authorization" });
    }

    // check the jwt token from header
    const token = req.headers["authorization"].split(" ")[1];
    // check the jwt token from header
    if (!token) {
      return res.status(401).json({ message: "Invalid authorization" });
    }
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    ) as { role: ROLES; id: string };

    // check the role
    if (role.length > 0 && !role.includes(decoded.role)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req["userId"] = decoded.id;
    req["role"] = decoded.role;
    req.headers["userId"] = decoded.id;
    req.headers["role"] = decoded.role;
    next();
  };
};

const role = async (req: Request, res: Response, next: NextFunction) => {};

const middlewares = { auth: auth, role: role };
export default middlewares;
