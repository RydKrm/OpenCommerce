import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation for the e-commerce platform",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: [
    "./src/modules/v1/**/routes/*.ts", // For route files
    "./src/modules/v1/**/*.ts", // For DTOs and controllers
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, (req: Request, res: Response) => {
    swaggerUi.setup(swaggerSpec)(req, res, (err) => {
      if (err) {
        console.error("Swagger UI Error:", err);
        res.status(500).send("Failed to load Swagger UI");
      }
    });
  });
  console.log("Swagger docs available at http://localhost:3000/api-docs");
};
