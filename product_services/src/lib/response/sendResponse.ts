import { Response } from "express";

const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data = null
) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    message,
    results: data,
    timestamp: new Date().toISOString(),
  });
};

export default sendResponse;
