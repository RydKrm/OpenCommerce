import auth from "@/auth/authenticate";
import { ROLES } from "@/types/role";
import validator from "@/utils/validator";
import express from "express";
import productCrudDto from "../dto/product.crud.dto";
import productCrudController from "../controller/product_crud.controller";
const productCrudRoute = express.Router();

productCrudRoute.post(
  "/create",
  auth([ROLES.VENDOR]),
  validator(productCrudDto.create),
  productCrudController.create
);

productCrudRoute.patch(
  "/update/:productId",
  auth([ROLES.VENDOR]),
  validator(productCrudDto.update),
  productCrudController.update
);

productCrudRoute.patch(
  "/update-status/:productId",
  auth([ROLES.ADMIN, ROLES.VENDOR]),
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

productCrudRoute.delete(
  "/delete/:productId",
  auth([ROLES.VENDOR]),
  productCrudController.delete
);

export default productCrudRoute;
