import express from "express";
import vendorCrudController from "../controller/vendor_crud.controller";
import validator from "@/utils/validator";
import vendorDto from "../dto/vendor_crud.dto";
const vendorCrudRoutes = express.Router();

vendorCrudRoutes.post(
  "/register",
  validator(vendorDto.create),
  vendorCrudController.create
);
vendorCrudRoutes.post(
  "/login",
  validator(vendorDto.login),
  vendorCrudController.login
);

vendorCrudRoutes.get("/all", vendorCrudController.getAll);
vendorCrudRoutes.get("/single/:id", vendorCrudController.getSingle);
vendorCrudRoutes.put(
  "/update/:id",
  validator(vendorDto.updateVendor),
  vendorCrudController.update
);
vendorCrudRoutes.delete("/delete/:id", vendorCrudController.delete);

export default vendorCrudRoutes;
