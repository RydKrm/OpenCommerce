import prisma from "@/database/prisma";
import { negativeResponse,positiveResponse } from "@/lib/response/response";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface IOptions {
  checker?: string[];
}

export const create = (model: keyof PrismaClient, options: IOptions = {}) => {
  return async (req: Request, res: Response) => {
    const bodyObject = req.body;

    if (options.checker) {
      const checker = options.checker;
      const searchArray: any = [];
      checker.forEach((field) => {
        if (bodyObject[field]) {
          searchArray.push({ [field]: bodyObject[field] });
        }
      });

      const countSearch = await (prisma[model] as any).count({
        where: {
          OR: searchArray,
        },
      });

      if (countSearch > 0) {
        return negativeResponse(
          res,
          `Field already exists with ${checker.join(", ")}}`
        );
      }
    }

    const newItem = await (prisma[model] as any).create({
      data: bodyObject,
    });

    return positiveResponse(res,"Crated successfully", {data:newItem});
  };
};
