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
    const userId = Number(req.params.userId);
    const commentList = await pagination(req, prisma.comment, { userId }, {});
    return commentList;
  }

  async getAllByProduct(req: Request) {
    const productId = Number(req.params.productId);
    const commentList = await pagination(
      req,
      prisma.comment,
      { productId },
      {}
    );
    return commentList;
  }

  async getAllByReview(req: Request) {
    const reviewId = Number(req.params.reviewId);
    const commentList = await pagination(req, prisma.comment, { reviewId }, {});
    return commentList;
  }

  async getAllByPost(req: Request) {
    const postId = Number(req.params.postId);
    const commentList = await pagination(
      req,
      prisma.comment,
      { postId: postId },
      {}
    );
    return commentList;
  }

  async getSingleComment(commentId: number) {
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new Error("Comment not found");
    }
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
    try {
      const comment = await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
    } catch (error) {
      throw new Error("Comment not found");
    }
  }
}

const commentCrudService = new CommentCrudService();
export default commentCrudService;
