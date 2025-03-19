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

      // Creating query parameters
      if (req.params) {
        Object.keys(req.params).forEach((param: string) => {
          url = url.replace(`:${param}`, req.params[param]);
        });
      }

      // Creating query parameters from request body (for POST, PUT, PATCH requests)
      if (req.query) {
        Object.keys(req.query).forEach((queryParam: string) => {
          url += `${url.includes("?") ? "&" : "?"}${queryParam}=${
            req.query[queryParam]
          }`;
        });
      }

      console.log(`Forwarding request to: ${url}`);

      let axiosConfig = {
        url,
        method,
        headers: { ...req.headers },
        data: req.body,
      };

      // Handle file upload requests (multipart/form-data)
      if (req.is("multipart/form-data") && req.files) {
        const formData = new FormData();

        // Append files
        if (Array.isArray(req.files)) {
          req.files.forEach((file: Express.Multer.File) => {
            formData.append(file.fieldname, file.buffer, {
              filename: file.originalname,
              contentType: file.mimetype,
            });
          });
        } else {
          // Single file upload
          const file = req.file as Express.Multer.File;
          formData.append(file.fieldname, file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
          });
        }

        // Append other form fields
        Object.keys(req.body).forEach((key) => {
          formData.append(key, req.body[key]);
        });

        axiosConfig.data = formData;
        axiosConfig.headers = {
          ...formData.getHeaders(),
        };
      }

      const { data } = await axios(axiosConfig);
      res.json(data);
    } catch (err) {
      //   console.error("Error forwarding request:", err);

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
