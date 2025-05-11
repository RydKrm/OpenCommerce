import express from "express";
import category_router from "./category/category.routes";
// import productRoutes from "./product/product.routes";
import commentRouter from "./comment/comment.router";
import replyRouter from "./reply/reply.router";
const v1_route = express.Router();

v1_route.use("/category", category_router);

// v1_route.use("/product", productRoutes);

// v1_route.use("/comment", commentRouter);

// v1_route.use("/reply", replyRouter);

export default v1_route;
