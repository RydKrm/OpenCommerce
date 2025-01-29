import express from "express";
import adminProfileController from "../controller/seller_profile.controller";
import auth from "@/auth/authenticate";
import validator from "@/utils/validator";
import { sellerDto } from "../dto/seller.dto";
import { ROLES } from "@/types/role";

const sellerProfileRouter = express.Router();

sellerProfileRouter.post(
  "/login",
  validator(sellerDto.login),
  adminProfileController.login
);

sellerProfileRouter.post(
  "/register",
  validator(sellerDto.register),
  adminProfileController.register
);

sellerProfileRouter.put(
  "/update/:id",
  auth([ROLES.SELLER]),
  adminProfileController.updateSeller
);

sellerProfileRouter.get(
  "/get/:id",
  auth([ROLES.SELLER]),
  adminProfileController.getSingleSeller
);

sellerProfileRouter.get(
  "/get",
  //   auth([ROLES.ADMIN]),
  adminProfileController.getAllSeller
);

sellerProfileRouter.delete(
  "/delete/:id",
  auth([ROLES.SELLER]),
  adminProfileController.deleteSeller
);

sellerProfileRouter.patch(
  "/updatePassword/:id",
  auth([ROLES.SELLER]),
  validator(sellerDto.updatePassword),
  adminProfileController.updatePassword
);

sellerProfileRouter.post(
  "/forgotPassword",
  validator(sellerDto.forgetPassword),
  adminProfileController.forgotPassword
);

export default sellerProfileRouter;
