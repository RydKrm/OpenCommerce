import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import asyncHandler from "@/middlewares/asyncHandler";

export const move = asyncHandler(async (req: Request, res: Response) => {
  const { sourcePath, targetFolder } = req.body;

  if (!sourcePath || !targetFolder) {
    return res
      .status(400)
      .json({ error: "sourcePath and targetFolder are required." });
  }

  try {
    const fileName = path.basename(sourcePath); // filename.ext
    const absoluteSourcePath = path.resolve(__dirname, "..", sourcePath);
    const absoluteTargetFolder = path.resolve(__dirname, "..", targetFolder);
    const absoluteTargetPath = path.join(absoluteTargetFolder, fileName);

    // Ensure the target folder exists
    await fs.mkdir(absoluteTargetFolder, { recursive: true });

    // Move the file (rename is more efficient than copy + delete if on same drive)
    await fs.rename(absoluteSourcePath, absoluteTargetPath);

    return res.status(200).json({
      message: "File moved successfully",
      from: sourcePath,
      to: path.join(targetFolder, fileName),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});
