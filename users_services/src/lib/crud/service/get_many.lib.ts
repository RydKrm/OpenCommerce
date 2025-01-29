import prisma from "@/database/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface IOptions {
  where?: { [key: string]: any };
  select?: { [key: string]: any };
  include?: { [key: string]: any };
}

export const getMany = (model: keyof PrismaClient, options: IOptions = {}) => {
  return async function (req: Request, res: Response) {
    try {
      const { select, include, where } = options;

      const queryObject = {
        where: { ...where },
        select,
        include,
      };

      const data = await (prisma[model] as any).find(queryObject);

      return res.status(200).json({
        message: "Data fetched successfully",
        status: true,
        data: data.length > 0 ? data : [],
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "An error occurred while fetching data",
        status: false,
        error: error.message,
      });
    }
  };
};
