import express from "express";
import crudRouter from "./router/order_crud.router";

const orderRouter = express.Router();
orderRouter.use("/crud", crudRouter);

export default orderRouter;
