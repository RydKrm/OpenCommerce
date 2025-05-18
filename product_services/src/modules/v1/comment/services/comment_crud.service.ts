import prisma from "@/database/prisma";
import { IComment } from "../interface/comment.interface";
import pagination from "@/lib/pagination/pagination";
import { Request } from "express";
import { CreateCategoryType } from "../../category/dto/category.dto";
import { CreateCommentDtoType } from "../dto/comment_crud.dto";
import sendData from "@/lib/response/send_data";

export const create = async (data: CreateCommentDtoType) => {
  const { images, ...rest } = data;
  const newComment = await prisma.comment.create({
    data: rest,
  });
  return sendData(200, "Comment created successfully", newComment);
};

export const getAllByUser = async (req: Request) => {
  const userId = Number(req.params.userId);
  const commentList = await pagination(req, prisma.comment, { userId }, {});
  return commentList;
};

export const getAllByProduct = async (req: Request) => {
  const productId = Number(req.params.productId);
  const commentList = await pagination(req, prisma.comment, { productId }, {});
  return commentList;
};

export const getAllByReview = async (req: Request) => {
  const reviewId = Number(req.params.reviewId);
  const commentList = await pagination(req, prisma.comment, { reviewId }, {});
  return commentList;
};

export const getAllByPost = async (req: Request) => {
  const postId = Number(req.params.postId);
  const commentList = await pagination(
    req,
    prisma.comment,
    { postId: postId },
    {}
  );
  return commentList;
};

export const getSingleComment = async (commentId: number) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });
  if (!comment) {
    throw new Error("Comment not found");
  }
  return comment;
};

export const updateComment = async (commentId: number, data: IComment) => {
  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data,
  });
  return updatedComment;
};

export const deleteComment = async (commentId: number) => {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch (error) {
    throw new Error("Comment not found");
  }
};
