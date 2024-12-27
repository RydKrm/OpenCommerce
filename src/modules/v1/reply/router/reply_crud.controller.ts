import validator from "@/utils/validator";
import express from "express";
import replyCrudDto from "../dto/reply_crud.dto";
import auth from "@/auth/authenticate";
import { ROLES } from "@/types/role";
import replyCrudController from "../controller/reply_crud.controller";

const replyCrudRouter = express.Router();

replyCrudRouter.post(
  "/create",
  auth([ROLES.VENDOR, ROLES.USER]),
  validator(replyCrudDto.create),
  replyCrudController.create
);

replyCrudRouter.get(
  "/allByUser",
  auth([ROLES.ADMIN, ROLES.VENDOR, ROLES.USER]),
  replyCrudController.getAllRepliesByUser
);

replyCrudRouter.get(
  "/allByComment",
  auth([ROLES.ADMIN, ROLES.USER]),
  replyCrudController.getAllReplyByComment
);

replyCrudRouter.get(
  "/single/:id",
  auth([ROLES.ADMIN, ROLES.VENDOR, ROLES.USER]),
  replyCrudController.getSingleReply
);

replyCrudRouter.patch(
  "/update/:id",
  auth([ROLES.ADMIN, ROLES.VENDOR, ROLES.USER]),
  validator(replyCrudDto.update),
  replyCrudController.update
);

replyCrudRouter.delete(
  "/delete/:id",
  auth([ROLES.ADMIN, ROLES.VENDOR, ROLES.USER]),
  replyCrudController.delete
);

export default replyCrudRouter;
