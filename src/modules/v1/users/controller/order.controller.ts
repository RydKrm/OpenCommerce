import { Request, Response } from "express";

export const orderList = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: [],
  });
};
