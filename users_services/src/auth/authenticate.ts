import { NextFunction, Request, Response } from "express";
import { ROLES } from "../types/role";
import jwt from "jsonwebtoken";
import defaultValues from "../config/default-values.config";
import IRequest from "../types/IRequest";

interface JwtVarify {
  id: string;
  role: ROLES;
}

const auth = (roleList: ROLES[]) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    try {
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

      const isVarify = jwt.verify(
        token,
        defaultValues.accessSecretKey as string
      ) as JwtVarify;

      if (!isVarify) {
        return res.status(403).json({
          status: false,
          message: "Invalid Token",
        });
      }

      if (Array.isArray(roleList) && roleList.length > 0) {
        if (roleList.includes(isVarify.role)) {
          req.role = isVarify.role;
          req.userId = isVarify.id;
          next();
        } else {
          return res.status(403).json({
            status: false,
            message: `Only ${roleList.toString()} can do this request`,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Access denied : Invalid Token",
      });
    }
  };
};

export default auth;
