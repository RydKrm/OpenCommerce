import multer from "multer";
import path from "path";
import fs from "fs";
import helper from "./utilis";

const uploadFile = (folderName: string) => {
  return multer({
    storage: multer.diskStorage({
      destination: async function (req, file, cb) {
        const folder = path.join("uploads", folderName);
        await helper.allocateDirectory(path.join(process.cwd(), folder));
        cb(null, folder);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file?.originalname?.split(" ")?.join("-"));
      },
    }),
  });
};

export default uploadFile;
