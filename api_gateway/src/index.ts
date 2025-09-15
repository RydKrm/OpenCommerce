import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { configureRoutes } from "./utils";

dotenv.config();

const app = express();

app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      message: "Too many requests, please try again later.",
    });
  },
});

app.use("/api", limiter);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

configureRoutes(app);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello, API Gateway is UP",
  });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
