import { Express, Request, Response } from "express";
import axios from "axios";
import config from "./config.json";
import middlewares from "./middlewares";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

const createHandler = (hostname: string, path: string, method: string) => {
  return async (req: Request, res: Response) => {
    try {
      let url = `${hostname}/${path}`;
      if (req.params) {
        Object.keys(req.params).forEach((param: string) => {
          url = url.replace(`:${param}`, req.params[param]);
        });
      }

      const { data } = await axios({
        url,
        method,
        data: req.body,
      });
      res.json(data);
    } catch (err) {
      console.log(err);

      if (err instanceof axios.AxiosError) {
        return res.status(err.response?.status || 500).json({
          message: err.response?.data || "Server calling error",
        });
      }

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
};

export const getMiddleware = (names: string[]) => {
  // @ts-ignore
  return names.map((name) => middlewares[name]);
};

export const configureRoutes = (app: Express) => {
  Object.entries(config.services).forEach(([name, service]) => {
    const hostname = service.url;
    service.routes.forEach((route) => {
      route.method.forEach((method) => {
        const handler = createHandler(hostname, route.path, method);

        const middleware = getMiddleware(route.middlewares);

        console.log(`${method} - ${hostname}/${route.path} `);
        app[method.toLowerCase() as HttpMethod](
          `/api/v1/${route.path}`,
          middleware,
          handler
        );
      });
    });
  });
};
