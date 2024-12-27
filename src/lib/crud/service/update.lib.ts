import prisma from "@/database/prisma";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface IOptions {
  where?: { [key: string]: any };
  notUpdate?: string[];
}

export const update = (model: keyof PrismaClient, options: IOptions = {}) => {
  return async (req: Request, res: Response) => {
    try {
      const bodyObject = req.body;

      const { where, notUpdate } = options;

      if (notUpdate) {
        for (const key of notUpdate) {
          delete bodyObject[key];
        }
      }

      const queryObject = {
        where: {
          ...where,
          id: parseInt(req.params.id),
        },
      };

      const data = await (prisma[model] as any).update({
        where: bodyObject,
        data: bodyObject,
      });

      if (data.length === 0) {
        return res.status(404).json({
          message: "Data not found",
          status: false,
        });
      } else {
        return res.status(200).json({
          message: "Data updated successfully",
          status: true,
        });
      }
    } catch (err: any) {
      return res.status(500).json({
        message: "Internal Server Error",
        status: false,
        error: err.message,
      });
    }
  };
};
