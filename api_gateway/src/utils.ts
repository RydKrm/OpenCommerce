import { Express, Request, Response } from "express";
import axios from "axios";
import app_routes from "./routes";
import middlewares from "./middlewares";
import createHandler from "./createHandler";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

// const createHandler = (hostname: string, path: string, method: string) => {
//   return async (req: Request, res: Response) => {
//     try {
//       let url = `${hostname}/${path}`;
//       if (req.params) {
//         Object.keys(req.params).forEach((param: string) => {
//           url = url.replace(`:${param}`, req.params[param]);
//         });
//       }

//       console.log(url);

//       const { data } = await axios({
//         url,
//         method,
//         data: req.body,
//       });
//       res.json(data);
//     } catch (err) {
//       console.log(err);

//       if (err instanceof axios.AxiosError) {
//         return res.status(err.response?.status || 500).json({
//           message: err.response?.data || "Server calling error",
//         });
//       }

//       res.status(500).json({
//         message: "Internal Server Error",
//       });
//     }
//   };
// };

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

        console.log(
          `${method} - ${role ? role : "public"} - ${hostname}/${route.path} `
        );

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
