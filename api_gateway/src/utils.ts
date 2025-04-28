import { Express } from "express";
import app_routes from "./routes";
import createHandler from "./createHandler";
import applyMiddleware from "./middlewares/index";
import { ROLES } from "./types/role";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

// export const getMiddleware = (names: string[], roles: string[] = []) => {
//   const middleware_list: any = [];
//   if (names.find((name) => name.toLocaleLowerCase() === "auth")) {
//     middleware_list.push(middlewares.auth(roles));
//   }
//   return middleware_list;
// };

export const configureRoutes = (app: Express) => {
  Object.entries(app_routes).forEach(([name, service]) => {
    const hostname = service.url;
    service.routes.forEach((route) => {
      route.method.forEach((method) => {
        const handler = createHandler(hostname, route.path, method);
        const role = (route?.role as ROLES[]) || [];
        app[method.toLowerCase() as HttpMethod](
          `/api/${route.path}`,
          // getMiddleware(route.middlewares, role),
          applyMiddleware(route.middlewares, { roles: role }),
          handler
        );
      });
    });
  });
};
