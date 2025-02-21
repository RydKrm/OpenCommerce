import express, { Request, Response } from "express";
import v1_route from "./modules/v1/v1.router";
import { errorHandler } from "./middleware/errorMiddleware";
import rateLimiter from "./utils/rate-limiter";
import { checkDatabaseConnection } from "./database/prisma";
import cors from "cors";
// import { setupSwagger } from "./config/swagger.config";

const app = express();
const PORT = 3002;

app.use(express.json());

// checking database connection
checkDatabaseConnection();

app.use(cors());

// Rate Limiting middleware
app.use(rateLimiter);

// swagger docs
// setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
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
