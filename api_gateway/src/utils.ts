import { Express, Request, Response } from "express";
import axios from "axios";
import app_routes from "./routes";
import middlewares from "./middlewares";
import createHandler from "./createHandler";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export const getMiddleware = (names: string[], roles: string[] = []) => {
  const middleware_list: any = [];
  if (names.find((name) => name.toLocaleLowerCase() === "auth")) {
    middleware_list.push(middlewares.auth(roles));
  }
  return middleware_list;
};

export const configureRoutes = (app: Express) => {
  Object.entries(app_routes).forEach(([name, service]) => {
    const hostname = service.url;
    service.routes.forEach((route) => {
      route.method.forEach((method) => {
        const handler = createHandler(hostname, route.path, method);
        const role = route?.role ? route?.role : [];
        const middleware = getMiddleware(route.middlewares, role);

        // console.log(
        //   `${method} - ${role ? role : "public"} - ${hostname}/${route.path} `
        // );

        app[method.toLowerCase() as HttpMethod](
          `/api/${route.path}`,
          // middlewares.auth(role),
          middleware,
          handler
        );
      });
    });
  });
};
