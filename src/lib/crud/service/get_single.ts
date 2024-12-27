import prisma from "@/database/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface IOptions {
  where?: { [key: string]: any };
  select?: Prisma.SelectSubset<any, any>;
  include?: { [key: string]: any };
}

export const get_single = (
  model: keyof PrismaClient,
  options: IOptions = {}
) => {
  return async function (req: Request, res: Response) {
    try {
      const { select, include, where } = options;

      const queryObject = {
        where: { ...where, id: parseInt(req.params.id) },
        select,
        include,
      };

      const data = await (prisma[model] as any).findFirst(queryObject);

      if (!data) {
        return res.status(404).json({
          status: false,
          message: "Data not found by id",
        });
      }

      return res.status(200).json({
        message: "Data fetched successfully",
        status: true,
        data,
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
