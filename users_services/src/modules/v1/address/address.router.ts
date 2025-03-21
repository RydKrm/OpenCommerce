import express, { Express, Response, Request } from "express";
import addressCrudRouter from "./routes/address_crud.router";

const addressRoute = express.Router();

addressRoute.get("/health", (req: Request, res: Response) => {
  res.send("Address service is up and running");
});

addressRoute.use("/crud", addressCrudRouter);

export default addressRoute;
