import { ROLES } from "@/types/role";
import auth from "./auth.middleware";
import uploadFile from "@/utils/fileUpload";
import serverUpload from "./send_server.middleware";

interface options {
  folderName?: string;
  roles?: ROLES[];
  uploadType?: string;
}

const applyMiddleware = (names: string[], options?: options) => {
  const middleware_list: any = [];

  if (names.find((name) => name.toLocaleLowerCase() === "auth")) {
    middleware_list.push(auth(options?.roles || []));
  }

  if (names.find((name) => name.toLowerCase() === "upload")) {
    const folderName = options?.folderName || "common";
    middleware_list.push(uploadFile(folderName).any());
    middleware_list.push(serverUpload());
  }

  return middleware_list;
};

export default applyMiddleware;
