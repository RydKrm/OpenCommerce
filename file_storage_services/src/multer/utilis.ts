import path from "path";
import fs from "fs";
import fsp from "fs/promises";

const filePathSlashReplace = (path: string) => {
  return path?.replace(/\\/g, "/");
};
const deleteFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
    });
  }
};
const copyFile = (from: string, to: string) => {
  fs.copyFile(from, to, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
const moveFile = (from: string, to: string) => {
  fs.rename(from, to, function (err) {
    if (err) throw err;
    console.log("Successfully moved!");
  });
};

const allocateDirectory = async (folderName: string) => {
  if (folderName && typeof folderName == "string") {
    try {
      await fsp.readdir(folderName);
    } catch (error) {
      await fsp.mkdir(folderName);
    }
  }
};

const copyFileToFolder = async (sourcePath: string, targetFolder: string) => {
  const fileName = path.basename(sourcePath); // Get the file name from the source path
  const targetPath = path.join(targetFolder, fileName); // Create the target path
  await allocateDirectory(targetFolder); // Ensure the target folder exists
  await fsp.copyFile(sourcePath, targetPath); // Copy the file
};

export default {
  filePathSlashReplace,
  deleteFile,
  copyFile,
  moveFile,
  allocateDirectory,
  copyFileToFolder,
};
