import { Request } from "express";

const multer = require("multer");
const path = require("path");
const { allocateDirectory } = require("./allocateFolder");

const uploadFile = (folderName: string) => {
  return multer({
    storage: multer.diskStorage({
      destination: async function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
      ) {
        const folder = path.join("uploads", folderName);
        await allocateDirectory(path.join(process.cwd(), folder));
        cb(null, folder);
      },
      filename: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
      ) {
        cb(null, Date.now() + "-" + file?.originalname?.split(" ")?.join("-"));
      },
    }),
  });
};

export default uploadFile;
