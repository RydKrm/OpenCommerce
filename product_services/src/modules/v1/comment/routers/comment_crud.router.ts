import auth from "@/auth/authenticate";
import express from "express";
import { ROLES } from "@/types/role";
import commentCrudController from "../controllers/comment_crud.controller";
import validator from "@/utils/validator";
import commentCrudDto from "../dto/comment_crud.dto";

const commentCrudRouter = express.Router();

commentCrudRouter.post(
  "/create",
  validator(commentCrudDto.create),
  commentCrudController.create
);

commentCrudRouter.patch(
  "/update/:commentId",
  validator(commentCrudDto.update),
  commentCrudController.update
);
commentCrudRouter.get("/single/:id", commentCrudController.getSingleComment);

commentCrudRouter.get(
  "/get-comments-by-product/:productId",
  commentCrudController.getAllCommentByProduct
);

commentCrudRouter.get(
  "/get-comments-by-user/:userId",
  commentCrudController.getAllCommentByUser
);

commentCrudRouter.get(
  "/get-comments-by-post/:postId",
  commentCrudController.getAllCommentByPost
);

commentCrudRouter.get(
  "/get-comments-by-review/:reviewId",
  commentCrudController.getAllCommentByReview
);

commentCrudRouter.delete(
  "/delete/:commentId",
  commentCrudController.deleteComment
);

export default commentCrudRouter;
