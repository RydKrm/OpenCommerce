import { ROLES } from "@/types/role";
import auth from "./auth.middleware";
import uploadFile from "@/utils/fileUpload";

interface options {
  folderName?: string;
  roles?: ROLES[];
  uploadType?: string;
}

const applyMiddleware = (names: string[], options?: options) => {
  const middleware_list: any = [];

  if (names.find((name) => name.toLocaleLowerCase() === "auth")) {
    middleware_list.push(auth(options?.roles));
  }

  if (names.find((name) => name.toLowerCase() === "upload")) {
    middleware_list.push(uploadFile);
  }
};

export default applyMiddleware;
