import prisma from "@/database/prisma";
import { IComment } from "../interface/comment.interface";
import pagination from "@/lib/pagination/pagination";
import { Request } from "express";
class CommentCrudService {
  async create(data: IComment) {
    const newComment = await prisma.comment.create({
      data,
    });
    return newComment;
  }

  async getAllByUser(req: Request) {
    const userId = req.params.userId;
    const commentList = await pagination(req, prisma.comment, { userId }, {});
    return commentList;
  }

  async getAllByProduct(req: Request) {
    const productId = req.params.productId;
    const commentList = await pagination(
      req,
      prisma.comment,
      { productId },
      {}
    );
    return commentList;
  }

  async getAllByReview(req: Request) {
    const reviewId = req.params.reviewId;
    const commentList = await pagination(req, prisma.comment, { reviewId }, {});
    return commentList;
  }

  async getAllByPost(req: Request) {
    const postId = req.params.reviewId;
    const commentList = await pagination(req, prisma.comment, { postId }, {});
    return commentList;
  }

  async getSingleComment(commentId: number) {
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });
    return comment;
  }

  async updateComment(commentId: number, data: IComment) {
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data,
    });
    return updatedComment;
  }

  async deleteComment(commentId: number) {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}

const commentCrudService = new CommentCrudService();
export default commentCrudService;
