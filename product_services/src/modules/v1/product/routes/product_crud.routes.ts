import express from "express";
import productCrudController from "../controller/product_crud.controller";
const productCrudRoute = express.Router();

productCrudRoute.post("/create", productCrudController.create);

productCrudRoute.post("/create-v2", productCrudController.create_v2);

productCrudRoute.patch("/update/:productId", productCrudController.update);

productCrudRoute.patch(
  "/update-status/:productId",
  productCrudController.updateStatus
);

productCrudRoute.get("/by-slug/:slug", productCrudController.findBySlug);

productCrudRoute.get("/list", productCrudController.getAll);

productCrudRoute.get("/details/:productId", productCrudController.details);

productCrudRoute.delete("/delete/:productId", productCrudController.delete);

export default productCrudRoute;
