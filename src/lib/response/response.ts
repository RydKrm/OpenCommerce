import { Response } from "express";
import { statusCodes } from "http-status-kit";
export const notFoundResponse = (res: Response) => {
  res.status(statusCodes.NOT_FOUND).json({
    status: false,
    message: "Resource not found",
  });
};

export const alreadyExitsResponse = (res: Response) => {
  res.status(statusCodes.BAD_REQUEST).json({
    status: false,
    message: "Resource already exists",
  });
};

export const negativeResponse = (res: Response, message: string) => {
  res.status(statusCodes.BAD_REQUEST).json({
    status: false,
    message,
  });
};

export const positiveResponse = (
  res: Response,
  message: string,
  option: any = {}
) => {
  const data: any = {
    status: true,
    message,
  };

  for (const key in option) {
    data[key] = option[key];
  }
  res.status(statusCodes.OK).json(data);
};
