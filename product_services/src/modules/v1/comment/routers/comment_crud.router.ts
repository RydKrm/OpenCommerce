import express, { Request, Response } from "express";
import commentCrudController from "../controllers/comment_crud.controller";
import { asyncHandler } from "@/middleware";
import {
  commentListByPost,
  commentListByProduct,
  commentListByUser,
  createComment,
  deleteComment,
  getSingleComment,
  updateComment,
} from "../services/comment_crud.service";
import { CreateCommentDto } from "../dto/comment_crud.dto";
import sendResponse from "@/lib/response/send_response";

const commentCrudRouter = express.Router();

commentCrudRouter.post(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    const data = CreateCommentDto.parse(req.body);
    const result = await createComment(data);
    return sendResponse(res, result);
  })
);

commentCrudRouter.patch(
  "/update/:commentId",
  asyncHandler(async (req: Request, res: Response) => {
    const commentId = req.params.commentId;
    const result = await updateComment(commentId, req.body);
    return sendResponse(res, result);
  })
);
commentCrudRouter.get(
  "/single/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const commentId = req.params.id;
    const result = await getSingleComment(commentId);
    return sendResponse(res, result);
  })
);

commentCrudRouter.get(
  "/list-by-product/:productId",
  asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const result = await commentListByProduct(productId, req.query);
    return sendResponse(res, result);
  })
);

commentCrudRouter.get(
  "/get-comments-by-user/:userId",
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await commentListByUser(userId, req.query);
    return sendResponse(res, result);
  })
);

commentCrudRouter.get(
  "/get-comments-by-post/:postId",
  asyncHandler(async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const result = await commentListByPost(postId, req.query);
    return sendResponse(res, result);
  })
);

commentCrudRouter.delete(
  "/delete/:commentId",
  asyncHandler(async (req: Request, res: Response) => {
    const commentId = req.params.commentId;
    const result = await deleteComment(commentId);
    return sendResponse(res, result);
  })
);

export default commentCrudRouter;
