import prisma from "@/database/prisma";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export const deleteData = (model: keyof PrismaClient) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await (prisma[model] as any).delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.status(200).json({
        message: "Data deleted successfully",
        status: true,
        data,
      });
    } catch (err: any) {
      return res.status(200).json({
        message: "Data not found by id",
        status: false,
      });
    }
  };
};
