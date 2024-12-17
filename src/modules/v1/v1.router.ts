import express from "express";
import userRouter from "./users/user.router";
const v1_route = express.Router();

v1_route.use("/user", userRouter);

export default v1_route;
