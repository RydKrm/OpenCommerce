import express from "express";
import productCrudRoute from "./routes/product_crud.routes";

const productRoutes = express.Router();

// Product routes
productRoutes.use("/basic", productCrudRoute);

export default productRoutes;
