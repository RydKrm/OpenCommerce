import multer from "multer";
import FormData from "form-data";
import fs from "fs";
import { Request, Response, Express } from "express";
import axios from "axios";

const upload = multer({ storage: multer.memoryStorage() });

const createHandler = (hostname: string, path: string, method: string) => {
  return async (req: Request, res: Response) => {
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

      let axiosConfig = {
        url,
        method,
        headers: {
          ...req.headers,
          host: new URL(hostname).host,
          "content-type": req.headers["content-type"] || "application/json",
          ...(req.headers.authorization && {
            authorization: req.headers.authorization,
          }),
        },
        data: req.body,
      };

      console.log("Making request with config:", {
        url: axiosConfig.url,
        method: axiosConfig.method,
        headers: axiosConfig.headers,
      });

      try {
        const { data } = await axios(axiosConfig);
        console.log("Response received:", data);
        res.json(data);
      } catch (axiosError) {
        console.error("Axios Error:", axiosError);
        throw axiosError; // Re-throw to be caught by outer try-catch
      }

      // Remove problematic headers
      delete axiosConfig.headers["content-length"];
      delete axiosConfig.headers["connection"];
      // delete axiosConfig.headers['accept-encoding'];
      console.log("checking auth ");
      const { data } = await axios(axiosConfig);

      console.log("checking after called");

      res.json(data);
    } catch (err) {
      console.error("Error details:", {
        message: err,
      });

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
