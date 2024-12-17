import express from "express";
import userController from "./controller/user.controller";
import validator from "../../../utils/validator";
import { userDto } from "./dto/user.dto";

const userRouter = express.Router();

userRouter.post("/login", validator(userDto.login), userController.login);

export default userRouter;
