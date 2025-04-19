import express from "express";

const orderRouter = express.Router();

import orderCrudRouter from "./routes/order_crud.routes";

orderRouter.use("/crud", orderCrudRouter);

export default orderRouter;
