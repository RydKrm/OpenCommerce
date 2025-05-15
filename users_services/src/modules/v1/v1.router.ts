import express from "express";
import userRouter from "./users/user.router";
import wishlistRouter from "./wish_list/routers/wishlist_crud.router";
const v1_route = express.Router();

v1_route.use("/user", userRouter);

v1_route.use("/wishlist", wishlistRouter);

v1_route.use("/address", addressRoute);

export default v1_route;
