import express from "express";
import commentCrudController from "../controllers/comment_crud.controller";

const commentCrudRouter = express.Router();

commentCrudRouter.post("/create", commentCrudController.create);

commentCrudRouter.patch("/update/:commentId", commentCrudController.update);
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
