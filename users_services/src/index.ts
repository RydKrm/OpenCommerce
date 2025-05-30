import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import YAML from "yamljs";
import v1_route from "./modules/v1/v1.router";
import { errorHandler } from "./middleware/errorMiddleware";
import rateLimiter from "./utils/rate-limiter";
import { checkDatabaseConnection } from "./database/prisma";
import { setupSwagger } from "./config/swagger.config";
import dotenv from "dotenv";
import { connectRabbitMQ } from "./broker/rabbitmq";
import IRequest from "./types/IRequest";
import { ROLES } from "./types/role";

const app = express();
const PORT = 3001;
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
// checking database connection
checkDatabaseConnection();

// connected to rabbitmq
connectRabbitMQ();

app.use(cors());
app.use((req: IRequest, res, next) => {
  req.userId = req.headers.userid as string;
  req.role = req.headers.role as ROLES;
  next();
});

// Rate Limiting middleware
app.use(rateLimiter);

// swagger docs
// setupSwagger(app);
app.use(morgan("dev"));

app.get("/health", (req: Request, res: Response) => {
  res.send("Hello, User Services is UP!");
});

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("request -> ", req.path);
//   next();
// });

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
