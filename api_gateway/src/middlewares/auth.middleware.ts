import { NextFunction, Request, Response } from "express";
import { ROLES } from "../types/role";
import jwt from "jsonwebtoken";
import defaultValues from "../config/default-values.config";
import IRequest from "../types/IRequest";

interface JwtVerify {
  id: string;
  role: ROLES;
}

const auth = (roleList?: ROLES[]) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      if (roleList && roleList.length === 0) {
        return res.status(403).json({
          status: false,
          message: "Role is not provided",
        });
      }

      if (!req.headers?.authorization) {
        return res.status(403).json({
          status: false,
          message: "Access denied: No token provided",
        });
      }

      const token = req.headers?.authorization?.split(" ")[1];
      if (!token) {
        return res.status(404).json({
          status: false,
          message: "Access denied: No token provided",
        });
      }

      const jwt_secret = process.env.ACCESS_TOKEN_SECRET_KEY;

      const isVerify = jwt.verify(token, jwt_secret as string) as JwtVerify;

      if (!isVerify) {
        return res.status(403).json({
          status: false,
          message: "Invalid Token",
        });
      }

      if (Array.isArray(roleList) && roleList.length > 0) {
        if (roleList.includes(isVerify.role)) {
          req.role = isVerify.role;
          req.user_id = isVerify.id;
          return next();
        } else {
          return res.status(403).json({
            status: false,
            message: `Only ${roleList.toString()} can do this request`,
          });
        }
      }
      return next();
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Access denied : Invalid Token",
      });
    }
  };
};

export default auth;
