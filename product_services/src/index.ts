import express, { Request, Response } from "express";
import v1_route from "./modules/v1/v1.router";
import { errorHandler } from "./middleware/errorMiddleware";
import rateLimiter from "./utils/rate-limiter";
import { checkDatabaseConnection } from "./database/prisma";
import cors from "cors";
import morgan from "morgan";
import { connectRabbitMQ } from "./broker/rabbitmq";
import { startRPCServer } from "./modules/v1/product/broker/send_cart.broker";
import IRequest from "./types/IRequest";
import { ROLES } from "./types/role";
import { startInventoryRPCServer } from "./modules/v1/product/broker/update_inventory.broker";
// import { setupSwagger } from "./config/swagger.config";

const app = express();

const PORT = 3000;

app.use(express.json());

// checking database connection
checkDatabaseConnection();

// connect to rabbitmq
connectRabbitMQ();

// consumer called
startRPCServer();
startInventoryRPCServer();

app.use(cors());
app.use(morgan("dev"));
// Rate Limiting middleware
app.use(rateLimiter);

app.use((req: IRequest, res, next) => {
  req.userId = req.headers.userid as string;
  req.role = req.headers.role as ROLES;
  next();
});

// swagger docs
// setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Product Server is UP");
});

app.use("/api/v1", v1_route);

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
