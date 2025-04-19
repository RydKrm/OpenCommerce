import express from "express";

const addressRouter = express.Router();
import addressCrudRouter from "./routes/address_crud.router";

addressRouter.use("/crud", addressCrudRouter);

export default addressRouter;
