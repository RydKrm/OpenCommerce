import defaultValues from "@/config/default-values.config";
import prisma from "@/database/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { skip } from "node:test";

interface IOptions {
  where?: { [key: string]: any };
  select?: { [key: string]: any };
  include?: { [key: string]: any };
}

export const getManyWithPagination = (
  model: keyof PrismaClient,
  options: IOptions
) => {
  return async function (req: Request, res: Response) {
    try {
      const { select, include, where } = options;
      const page =
        parseInt(req.query.page as string) || defaultValues.paginationPage;
      const limit =
        parseInt(req.query.limit as string) || defaultValues.paginationLimit;

      const queryObject = {
        where: { ...where, id: parseInt(req.params.id) },
        select,
        include,
      };

      const data = await (prisma[model] as any).find({
        ...queryObject,
        limit,
        skip: (page - 1) * limit,
      });

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
