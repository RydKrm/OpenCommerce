import express from "express";
import userController from "../controller/user.controller";

const userProfileRouter = express.Router();

userProfileRouter.post("/login", userController.login);

userProfileRouter.post("/create", userController.register);

userProfileRouter.post("/register", userController.register);

userProfileRouter.get("/list", userController.getAllUser);

userProfileRouter.get("/details/:id", userController.getSingle);

userProfileRouter.patch("/update/:id", userController.updateUser);

userProfileRouter.delete("/delete/:id", userController.deleteUser);

export default userProfileRouter;
