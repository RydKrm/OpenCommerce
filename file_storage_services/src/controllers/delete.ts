import asyncHandler from "@/middlewares/asyncHandler";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const deleteSingle = asyncHandler(
  async (req: Request, res: Response) => {
    const { relativeFilePath } = req.body;
    if (!relativeFilePath) {
      return res
        .status(400)
        .json({ message: "Relative file path is required" });
    }

    const filePath = path.resolve(__dirname, "..", relativeFilePath); // adjust `..` if needed

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message);
      }
    });

    return res.status(200).json({ message: "File deleted successfully" });
  }
);
