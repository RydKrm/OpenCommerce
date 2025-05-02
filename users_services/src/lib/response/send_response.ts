import IResponse from "@/types/IResponse";
import { Response } from "express";

const sendResponse = (res: Response, data: IResponse) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    message: data.message,
    results: data.data,
    timestamp: new Date().toISOString(),
  });
};

export default sendResponse;
