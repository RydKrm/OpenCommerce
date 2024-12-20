import validator from "@/utils/validator";
import express from "express";
import { userDto } from "../dto/user.dto";
import userController from "../controller/user.controller";

const userProfileRouter = express.Router();

userProfileRouter.post(
  "/login",
  validator(userDto.login),
  userController.login
);

userProfileRouter.post(
  "/register",
  validator(userDto.register),
  userController.register
);

userProfileRouter.get("/all", userController.getAllUser);

userProfileRouter.get("/:id", userController.getSingle);

userProfileRouter.patch("/:id", userController.updateUser);

userProfileRouter.delete("/:id", userController.deleteUser);

export default userProfileRouter;
