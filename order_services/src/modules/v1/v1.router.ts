import express from "express";
const v1_route = express.Router();

import addressRouter from "./address/address.routes";

v1_route.use("/address", addressRouter);

export default v1_route;
