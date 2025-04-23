import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import asyncHandler from "@/middlewares/asyncHandler";

export const copyFileController = asyncHandler(
  async (req: Request, res: Response) => {
    const { sourcePath, targetFolder } = req.body;

    if (!sourcePath || !targetFolder) {
      return res
        .status(400)
        .json({ error: "sourcePath and targetFolder are required." });
    }

    try {
      const fileName = path.basename(sourcePath);
      const absoluteSourcePath = path.resolve("", sourcePath);
      const absoluteTargetFolder = path.resolve("./uploads", targetFolder);
      const absoluteTargetPath = path.join(absoluteTargetFolder, fileName);

      // Ensure the target folder exists
      await fs.mkdir(absoluteTargetFolder, { recursive: true });

      // Copy the file
      await fs.copyFile(absoluteSourcePath, absoluteTargetPath);

      return res.status(200).json({
        message: "File copied successfully",
        from: sourcePath,
        to: path.join("uploads", targetFolder, fileName),
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
);
