import path from "path";
import fs from "fs";
import asyncHandler from "@/middlewares/asyncHandler";
import { Request, Response } from "express";

export const deleteMany = asyncHandler(async (req: Request, res: Response) => {
  const { relativeFilePaths } = req.body;

  relativeFilePaths.forEach((relativeFilePath: string) => {
    const filePath = path.resolve(__dirname, "..", relativeFilePath);

    fs.unlink(filePath, (err) => {
      if (err) {
        throw new Error("Error deleting file:", err);
      }
    });
  });

  res.status(200).json({ message: "Files all deleted successfully" });
});
