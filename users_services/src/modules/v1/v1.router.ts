import express from "express";
import userRouter from "./users/user.router";
import sellerRouter from "./sellers/seller.routes";
import vendorRouter from "./vendor/vendor.routes";
import productRoutes from "./product/product.routes";
const v1_route = express.Router();

v1_route.use("/user", userRouter);

v1_route.use("/seller", sellerRouter);

v1_route.use("/vendor", vendorRouter);

v1_route.use("/product", productRoutes);

export default v1_route;
