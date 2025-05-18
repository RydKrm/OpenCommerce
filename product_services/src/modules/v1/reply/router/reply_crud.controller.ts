import express, { Request, Response } from "express";
import replyCrudController from "../controller/reply_crud.controller";
import { asyncHandler } from "@/middleware";
import { CreateReplyDto } from "../dto/reply_crud.dto";
import {
  createReply,
  deleteReply,
  getAllReplyByComment,
  getAllReplyByUser,
  getSingleReply,
  updateReply,
} from "../service/reply_crud.service";
import sendResponse from "@/lib/response/send_response";
import IRequest from "@/types/IRequest";

const replyCrudRouter = express.Router();

replyCrudRouter.post(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    const data = CreateReplyDto.parse(req.body);
    const reply = await createReply(data);
    return sendResponse(res, reply);
  })
);

replyCrudRouter.get(
  "/allByUser",
  asyncHandler(async (req: IRequest, res: Response) => {
    const userId = req.user_id as string;
    const replies = await getAllReplyByUser(userId);
    return sendResponse(res, replies);
  })
);

replyCrudRouter.get(
  "/allByComment/:commentId",
  asyncHandler(async (req: IRequest, res: Response) => {
    const commentId = req.params.commentId;
    const replies = await getAllReplyByComment(commentId);
    return sendResponse(res, replies);
  })
);

replyCrudRouter.get(
  "/single/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const reply = await getSingleReply(req.params.id);
    return sendResponse(res, reply);
  })
);

replyCrudRouter.patch(
  "/update/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const reply = await updateReply(req.params.id, req.body);
    return sendResponse(res, reply);
  })
);

replyCrudRouter.delete(
  "/delete/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const reply = await deleteReply(req.params.id);
    return sendResponse(res, reply);
  })
);

export default replyCrudRouter;
