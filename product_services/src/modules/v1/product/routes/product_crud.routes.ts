import auth from "@/auth/authenticate";
import { ROLES } from "@/types/role";
import validator from "@/utils/validator";
import express from "express";
import productCrudDto from "../dto/product.crud.dto";
import productCrudController from "../controller/product_crud.controller";
const productCrudRoute = express.Router();

productCrudRoute.post(
  "/create",
  validator(productCrudDto.create),
  productCrudController.create
);

productCrudRoute.patch(
  "/update/:productId",
  validator(productCrudDto.update),
  productCrudController.update
);

productCrudRoute.patch(
  "/update-status/:productId",
  productCrudController.updateStatus
);

productCrudRoute.get("/all", productCrudController.getAll);

productCrudRoute.get("/single/:productId", productCrudController.getSingle);

productCrudRoute.get(
  "/get-all-by-category/:categoryId",
  productCrudController.getProductByCategory
);

productCrudRoute.get(
  "/get-all-by-vendor/:vendorId",
  productCrudController.getProductByVendor
);

productCrudRoute.delete("/delete/:productId", productCrudController.delete);

export default productCrudRoute;
