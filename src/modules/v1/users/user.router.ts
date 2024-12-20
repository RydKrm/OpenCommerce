import express from "express";
import userProfileRouter from "./routes/user_profile.router";

const userRouter = express.Router();

userRouter.use("/profile", userProfileRouter);

export default userRouter;
