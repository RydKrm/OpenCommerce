import express from "express";
import userRouter from "./users/user.router";
import adminRouter from "./admin/admin.routes";
import sellerRouter from "./sellers/seller.routes";
import category_router from "./category/category.routes";
import vendorRouter from "./vendor/vendor.routes";
import productRoutes from "./product/product.routes";
import commentRouter from "./comment/comment.router";
import replyRouter from "./reply/reply.router";
const v1_route = express.Router();

v1_route.use("/user", userRouter);

v1_route.use("/admin", adminRouter);

v1_route.use("/seller", sellerRouter);

v1_route.use("/category", category_router);

v1_route.use("/vendor", vendorRouter);

v1_route.use("/product", productRoutes);

v1_route.use("/comment", commentRouter);

v1_route.use("/reply", replyRouter);

export default v1_route;
