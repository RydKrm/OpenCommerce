import express, { Request, Response } from "express";
import v1_route from "./modules/v1/v1.router";
import { errorHandler } from "./middleware/errorMiddleware";
import rateLimiter from "./utils/rate-limiter";
import { checkDatabaseConnection } from "./database/prisma";

const app = express();
const PORT = 3000;

app.use(express.json());

// checking database connection
checkDatabaseConnection();

app.get("/health", (req: Request, res: Response) => {
  res.send("Hello, Server is running");
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

// Rate Limiting middleware
app.use(rateLimiter);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

export default app;
