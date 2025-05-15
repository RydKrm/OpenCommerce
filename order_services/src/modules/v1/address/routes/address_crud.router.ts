import auth from "@/auth/authenticate";
import { ROLES } from "@/types/role";
import validator from "@/utils/validator";
import express from "express";
import addressCrudDto from "../dto/address.dto";
import addressController from "../controller/address_crud.controller";
const addressCrudRouter = express.Router();

addressCrudRouter.post(
  "/create",
  auth([ROLES.USER]),
  validator(addressCrudDto.create),
  addressController.createAddress
);

addressCrudRouter.get(
  "/single/:id",
  auth([ROLES.USER]),
  addressController.getSingleAddress
);

addressCrudRouter.get(
  "/allByUser",
  auth([ROLES.USER]),
  addressController.getAllAddress
);

addressCrudRouter.put(
  "/update/:id",
  auth([ROLES.USER]),
  validator(addressCrudDto.create),
  addressController.updateAddress
);

addressCrudRouter.delete(
  "/delete/:id",
  auth([ROLES.USER]),
  addressController.deleteAddress
);

export default addressCrudRouter;
