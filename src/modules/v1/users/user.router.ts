import express from "express";
import userProfileRouter from "./routes/user_profile.router";
import orderRouter from "./routes/order.router";

const userRouter = express.Router();

userRouter.use("/profile", userProfileRouter);
userRouter.use("/order", orderRouter);

export default userRouter;
