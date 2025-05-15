import fsp from "fs/promises";
export const allocateDirectory = async (folderName: string) => {
  if (folderName && typeof folderName == "string") {
    try {
      await fsp.readdir(folderName);
    } catch (error) {
      await fsp.mkdir(folderName);
    }
  }
};
