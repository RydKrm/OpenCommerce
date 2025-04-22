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

      // console.log(`Forwarding request to: ${url}`);
      console.log("Request headers form api-gateway", req.headers);
      // console.log("Request body:", req.body);

      // building the header object
      const header_object = {
        "user-agent": req.headers["user-agent"],
        "cache-control": req.headers["cache-control"],
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

      // Handle file upload requests (multipart/form-data)
      // if (req.is("multipart/form-data") && req.files) {
      //   const formData = new FormData();

      //   // Append files
      //   if (Array.isArray(req.files)) {
      //     req.files.forEach((file: Express.Multer.File) => {
      //       formData.append(file.fieldname, file.buffer, {
      //         filename: file.originalname,
      //         contentType: file.mimetype,
      //       });
      //     });
      //   } else {
      //     // Single file upload
      //     const file = req.file as Express.Multer.File;
      //     formData.append(file.fieldname, file.buffer, {
      //       filename: file.originalname,
      //       contentType: file.mimetype,
      //     });
      //   }

      //   // Append other form fields
      //   Object.keys(req.body).forEach((key) => {
      //     formData.append(key, req.body[key]);
      //   });

      //   axiosConfig.data = formData;
      //   axiosConfig.headers = {
      //     ...req.headers,
      //     ...formData.getHeaders(),
      //   };
      // }

      try {
        const { data } = await axios(axiosConfig);
        console.log("✅ Axios request successful");
        console.log("Checking axios is calling or not");
        return res.json(data);
      } catch (err) {
        console.log("❌ Axios request failed");

        if (axios.isAxiosError(err)) {
          console.log("Axios error message:", err.message);
          console.log("Axios error response:", err.response?.data);

          return res.status(err.response?.status || 500).json({
            message: err.response?.data || "Server calling error",
          });
        }

        console.log("Non-Axios error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
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
