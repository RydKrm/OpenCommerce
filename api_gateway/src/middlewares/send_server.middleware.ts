import axios from "axios";
import FormData from "form-data";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { unlink } from "fs/promises";

// interface fileList{
//     fieldType:any : {

//     }
// }

const serverUpload = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const fileList = req.files as Express.Multer.File[];

    // console.log("fileList", fileList);
    // console.log("req.body", req.body);

    if (!fileList || fileList.length === 0) {
      return res.status(400).json({ error: "No files found" });
    }

    try {
      const formData = new FormData();

      // Read each file from the disk and append to FormData
      for (const file of fileList) {
        formData.append(
          file.fieldname,
          fs.createReadStream(file.path),
          file.originalname
        );
      }

      const file_server = process.env.FILE_SERVER_URL;
      if (!file_server) {
        throw new Error("FILE_SERVER_URL is not defined in the .env file");
      }

      const response = await axios.post(
        `${file_server}/api/upload?folderName=products`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      if (response.status !== 200) {
        return res.status(400).json({ error: "Failed to upload files" });
      }

      const filesList = response.data.files;

      console.log("Files lists ", filesList);

      const fileData: any = {};

      for (const files in filesList) {
        for (const file of filesList[files]) {
          if (!fileData[file.fieldname]) {
            fileData[file.fieldname] = [];
          }
          fileData[file.fieldname].push(file.path);
          const fieldName = file?.fieldname;
          req.body[fieldName] = fileData[file.fieldname];
        }
      }

      console.log("req.body after file upload", req.body);
      // Delete the uploaded files from API Gateway after sending
      await Promise.all(fileList.map((file) => unlink(file.path)));

      return next();
    } catch (err) {
      console.error("Error uploading files to file server:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default serverUpload;
