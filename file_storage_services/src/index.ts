import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { error_handler } from "./error/error_handler";
import router from "./routes/routes";

const app = express();
const PORT = 3004;
dotenv.config();

app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
  console.log("Methods ", req.method, "- URL", req.originalUrl);
  next();
});

app.get("/health", (req: Request, res: Response) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

export default app;
