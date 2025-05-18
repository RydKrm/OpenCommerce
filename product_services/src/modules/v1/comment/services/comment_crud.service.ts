import prisma from "@/database/prisma";
import { IComment } from "../interface/comment.interface";
import pagination from "@/lib/pagination/pagination";
import { Request } from "express";
import { CreateCategoryType } from "../../category/dto/category.dto";
import { CreateCommentDtoType } from "../dto/comment_crud.dto";
import sendData from "@/lib/response/send_data";
import { IQuery } from "@/types/IQuery";

export const createComment = async (data: CreateCommentDtoType) => {
  const { images, ...rest } = data;
  const newComment = await prisma.comment.create({
    data: rest,
  });
  return sendData(200, "Comment created successfully", newComment);
};

export const commentListByUser = async (userId: string, query: IQuery) => {
  const { limit = 10, skip = 0 } = query;
  const list = await prisma.comment.findMany({
    where: {
      userId,
    },
    take: Number(limit),
    skip: Number(skip),
  });

  const totalCount = await prisma.comment.count({
    where: {
      userId: Number(userId),
    },
  });

  return sendData(200, "Comments fetched successfully", { list, totalCount });
};

export const commentListByProduct = async (
  productId: string,
  query: IQuery
) => {
  const { limit = 10, skip = 0 } = query;
  const list = await prisma.comment.findMany({
    where: {
      productId,
    },
    take: Number(limit),
    skip: Number(skip),
  });

  const totalCount = await prisma.comment.count({
    where: {
      userId: Number(productId),
    },
  });

  return sendData(200, "Comments fetched successfully", { list, totalCount });
};

export const commentListByPost = async (postId: string, query: IQuery) => {
  const { limit = 10, skip = 0 } = query;
  const list = await prisma.comment.findMany({
    where: {
      postId,
    },
    take: Number(limit),
    skip: Number(skip),
  });

  const totalCount = await prisma.comment.count({
    where: {
      userId: Number(postId),
    },
  });

  return sendData(200, "Comments fetched successfully", { list, totalCount });
};
export const getSingleComment = async (commentId: string) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });
  if (!comment) {
    return sendData(400, "Comment not found by id");
  }
  return sendData(200, "Comment fetched successfully", comment);
};

export const updateComment = async (commentId: string, data: IComment) => {
  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data,
  });
  return sendData(200, "Comment updated successfully", updatedComment);
};

export const deleteComment = async (commentId: string) => {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return sendData(200, "Comment deleted successfully", comment);
  } catch (error) {
    return sendData(400, "Comment not found by id");
  }
};
