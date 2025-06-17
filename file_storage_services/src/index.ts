import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { error_handler } from "./error/error_handler";
import router from "./routes/routes";
import { connect as connectRabbitMQ, closeConnection as closeRabbitMQConnection } from "../broker/rabbitmq";

const app = express();
const PORT = process.env.PORT || 3004;
dotenv.config();
// Serve static files from the 'uploads' folder
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  console.log("Methods ", req.method, "- URL", req.originalUrl);
  next();
});

app.get("/health", (_req: Request, res: Response) => {
  res.send("Hello, File storing Services is UP!");
});

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Router Not Found",
  });
});

// Error Handling middleware
// app.use(error_handler);

// app.get("/api-docs-json", (req, res) => {
//   res.json(setupSwagger);
// });

const startServer = async () => {
  try {
    await connectRabbitMQ();
    console.log("RabbitMQ connected successfully.");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });

    const gracefulShutdown = async (signal: string) => {
      console.log(`\nReceived ${signal}. Starting graceful shutdown...`);

      // Stop accepting new connections
      server.close(async (err) => {
        if (err) {
          console.error("Error during server close:", err);
          process.exit(1);
        }
        console.log("HTTP server closed.");

        // Close RabbitMQ connection
        await closeRabbitMQConnection();
        console.log("RabbitMQ connection closed.");

        console.log("Graceful shutdown completed.");
        process.exit(0);
      });

      // If server hasn't finished in a timeout period, force close
      setTimeout(() => {
        console.error("Graceful shutdown timed out. Forcing exit.");
        process.exit(1);
      }, 10000); // 10 seconds timeout
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

  } catch (error) {
    console.error("Failed to start the server or connect to RabbitMQ:", error);
    process.exit(1);
  }
};

startServer();

export default app;
