import asyncHandler from "@/middlewares/asyncHandler";
import uploadFile from "@/multer/upload";
import { Request, Response } from "express";

export const upload = asyncHandler(async (req: Request, res: Response) => {
  let folderName = "common";

  if (req.query.folderName) {
    folderName = req.query.folderName as string;
  }

  let fileList = [] as Express.Multer.File[];

  const middleware = uploadFile(folderName).any();

  await middleware(req, res, (err: any) => {
    if (err) {
      console.log("Error ", err);
      return res.status(400).json({ error: err.message });
    }
    fileList = (req.files as Express.Multer.File[]) || [];

    const fieldsMap: any = {};

    for (const file of fileList) {
      if (!fieldsMap[file.fieldname]) {
        fieldsMap[file.fieldname] = [];
      }
      fieldsMap[file.fieldname].push(file);
    }

    // Detect the pattern
    let mode = "unknown";
    const fieldNames = Object.keys(fieldsMap);

    if (fileList.length === 1 && fieldNames.length === 1) {
      mode = "single";
    } else if (fieldNames.length === 1) {
      mode = "multiple";
    } else if (fieldNames.length > 1) {
      mode = "mixed";
    }

    return res.status(200).json({
      mode,
      files: fieldsMap,
    });
  });
});
