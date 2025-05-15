import express from "express";
import crudRouter from "./router/order_crud.router";

const orderRouter = express.Router();
orderRouter.use("/crud", crudRouter);

import orderCrudRouter from "./routes/order_crud.routes";

orderRouter.use("/crud", orderCrudRouter);

export default orderRouter;
