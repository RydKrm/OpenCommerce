import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import YAML from "yamljs";
import v1_route from "./modules/v1/v1.router";
import { errorHandler } from "./middleware/errorMiddleware";
import rateLimiter from "./utils/rate-limiter";
import { checkDatabaseConnection } from "./database/prisma";
import { setupSwagger } from "./config/swagger.config";
import dotenv from "dotenv";

const app = express();
const PORT = 3001;
dotenv.config();

app.use(express.json());

// checking database connection
checkDatabaseConnection();

app.use(cors());
app.use((req, res, next) => {
  console.log("Request headers from services", req.headers);
  next();
});

// Rate Limiting middleware
app.use(rateLimiter);

// swagger docs
// setupSwagger(app);
app.use(morgan("dev"));
const database_url = process.env.DATABASE_URL;
console.log(database_url);

app.get("/health", (req: Request, res: Response) => {
  res.send("Hello, User Services is UP!");
});

app.use("/api/v1", v1_route);

// Swagger route
// Load the main Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, "../api_doc/main.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(setupSwagger));

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Router Not Found",
  });
});

// Error Handling middleware
app.use(errorHandler);

// app.get("/api-docs-json", (req, res) => {
//   res.json(setupSwagger);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

export default app;
