import express from "express";
const v1_route = express.Router();

import addressRouter from "./address/address.routes";
import orderRouter from "./order/order.router";

v1_route.use("/address", addressRouter);
v1_route.use("/order", orderRouter);

export default v1_route;
