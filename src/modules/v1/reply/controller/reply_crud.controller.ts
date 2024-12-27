import express, { Request, Response } from "express";
import replyCrudDto from "./../dto/reply_crud.dto";
import replyCrudService from "../service/reply_crud.service";
import { negativeResponse, positiveResponse } from "@/lib/response/response";

class ReplyCrudController {
  async create(req: Request, res: Response) {
    try {
      const reply = await replyCrudService.create(req.body);
      return positiveResponse(res, "Reply created successfully", {
        data: reply,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const reply = await replyCrudService.update(
        Number(req.params.id),
        req.body
      );
      return positiveResponse(res, "Reply updated successfully", {
        data: reply,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getSingleReply(req: Request, res: Response) {
    try {
      const reply = await replyCrudService.getSingle(Number(req.params.id));
      return positiveResponse(res, "Reply retrieved successfully", {
        data: reply,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllRepliesByUser(req: Request, res: Response) {
    try {
      const replies = await replyCrudService.getAllReplyByUser(
        Number(req.params.userId)
      );
      return positiveResponse(res, "Replies retrieved successfully", {
        data: replies,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllReplyByComment(req: Request, res: Response) {
    try {
      const replyList = await replyCrudService.getAllReplyByComment(
        Number(req.params.commentId)
      );
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await replyCrudService.deleteReply(Number(req.params.id));
      return positiveResponse(res, "Reply deleted successfully");
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }
}

const replyCrudController = new ReplyCrudController();

export default replyCrudController;
