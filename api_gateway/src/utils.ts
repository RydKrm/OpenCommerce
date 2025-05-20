import { Express } from "express";
import app_routes from "./routes";
import createHandler from "./createHandler";
import applyMiddleware from "./middlewares/index";
import { ROLES } from "./types/role";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface IService {
  url: string;
  methods: string[];
  middlewares: string[];
  role: string[];
  uploadFolder: string;
}

export const configureRoutes = (app: Express) => {
  Object.entries(app_routes).forEach(([name, service]) => {
    const hostname = service.url;
    service.routes.forEach((route) => {
      route.method.forEach((method) => {
        const handler = createHandler(hostname, route.path, method);
        // console.log(`Route: ${route.path} - ${method}`);

        const role = (route?.role as ROLES[]) || [];
        const uploadFolder = name;
        app[method.toLowerCase() as HttpMethod](
          `/api/${route.path}`,
          applyMiddleware(route.middlewares, {
            roles: role,
            folderName: uploadFolder,
          }),
          handler
        );
      });
    });
  });
};
