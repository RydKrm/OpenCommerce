import { Response } from "express";
import axios from "axios";
import IRequest from "./types/IRequest";

const createHandler = (hostname: string, path: string, method: string) => {
  return async (req: IRequest, res: Response) => {
    try {
      let url = `${hostname}/${path}`;

      // Creating path parameters
      if (req.params) {
        Object.keys(req.params).forEach((param: string) => {
          url = url.replace(`:${param}`, req.params[param]);
        });
      }

      // Handle query parameters (should only be from req.query, not req.body)
      if (Object.keys(req.query).length > 0) {
        Object.keys(req.query).forEach((queryParam: string) => {
          url += `${url.includes("?") ? "&" : "?"}${queryParam}=${
            req.query[queryParam]
          }`;
        });
      }

      // building the header object
      const header_object = {
        "user-agent": req.headers["user-agent"],
        "cache-control": req.headers["cache-control"],
        userId: req.user_id,
        role: req.role,
        cookie: req.headers["cookie"],
        host: req.headers["host"],
      };

      let axiosConfig = {
        url,
        method,
        headers: header_object,
        data: req.body,
        timeout: 5000,
      };

      try {
        const { data } = await axios(axiosConfig);
        return res.json(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return res.status(err.response?.status || 500).json({
            message: err.response?.data || "Server calling error",
          });
        }
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (err) {
      // console.error("Error details:", err);

      if (axios.isAxiosError(err)) {
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

export default createHandler;
