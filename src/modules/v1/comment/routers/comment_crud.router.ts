import auth from "@/auth/authenticate";
import express from "express";
import { ROLES } from "@/types/role";
import commentCrudController from "../controllers/comment_crud.controller";
import validator from "@/utils/validator";
import commentCrudDto from "../dto/comment_crud.dto";

const commentCrudRouter = express.Router();

commentCrudRouter.post(
  "/create",
  auth([ROLES.USER, ROLES.VENDOR]),
  validator(commentCrudDto.create),
  commentCrudController.create
);

commentCrudRouter.patch(
  "/update/:commentId",
  auth([ROLES.USER, ROLES.VENDOR]),
  validator(commentCrudDto.update),
  commentCrudController.update
);

commentCrudRouter.get(
  "/get-comments-by-product/:productId",
  auth([ROLES.USER, ROLES.VENDOR]),
  commentCrudController.getAllCommentByProduct
);

commentCrudRouter.get(
  "/get-comments-by-user/:userId",
  auth([ROLES.USER, ROLES.VENDOR]),
  commentCrudController.getAllCommentByUser
);

commentCrudRouter.get(
  "/get-comments-by-post/:postId",
  auth([ROLES.USER, ROLES.VENDOR]),
  commentCrudController.getAllCommentByPost
);

commentCrudRouter.get(
  "/get-comments-by-review/:reviewId",
  auth([ROLES.USER, ROLES.VENDOR]),
  commentCrudController.getAllCommentByReview
);

commentCrudRouter.delete(
  "/delete/:commentId",
  auth([ROLES.USER, ROLES.VENDOR]),
  commentCrudController.deleteComment
);

export default commentCrudRouter;
