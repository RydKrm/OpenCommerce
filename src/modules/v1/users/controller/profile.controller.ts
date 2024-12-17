import { Request, Response } from "express";

export const userProfile = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: [],
  });
};

export const userGetProfile = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: [],
  });
};
