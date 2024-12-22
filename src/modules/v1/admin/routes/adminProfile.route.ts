import express from "express";
import adminProfileController from "../controller/admin_profile.controller";
import auth from "@/auth/authenticate";
import validator from "@/utils/validator";
import { adminDto } from "../dto/admin.dto";
import { ROLES } from "@/types/role";

const adminProfileRouter = express.Router();

adminProfileRouter.post(
  "/login",
  validator(adminDto.login),
  adminProfileController.login
);

adminProfileRouter.post(
  "/register",
  validator(adminDto.register),
  adminProfileController.register
);

adminProfileRouter.patch(
  "/update/:id",
  auth([ROLES.ADMIN]),
  adminProfileController.updateAdmin
);

adminProfileRouter.get(
  "/get/:id",
  auth([ROLES.ADMIN]),
  adminProfileController.getSingleAdmin
);

adminProfileRouter.get(
  "/get",
  auth([ROLES.ADMIN]),
  adminProfileController.getAllAdmin
);

adminProfileRouter.delete(
  "/delete/:id",
  auth([ROLES.ADMIN]),
  adminProfileController.deleteAdmin
);

adminProfileRouter.patch(
  "/updatePassword/:id",
  auth([ROLES.ADMIN]),
  validator(adminDto.updatePassword),
  adminProfileController.updatePassword
);

adminProfileRouter.post(
  "/forgotPassword",
  validator(adminDto.forgetPassword),
  adminProfileController.forgotPassword
);

export default adminProfileRouter;
