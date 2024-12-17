import express, { Request, Response } from "express";
import { userGetProfile } from "../controller/profile.controller";
import { orderList } from "../controller/order.controller";
const userProfileRouter = express.Router();

userProfileRouter.get("/allOrder", userGetProfile);
userProfileRouter.get("/order", orderList);

export default userProfileRouter;