import prisma from "@/database/prisma";
import { CreateReplyType } from "../dto/reply_crud.dto";
import sendData from "@/lib/response/send_data";

export const createReply = async (data: CreateReplyType) => {
  const { images, ...rest } = data;
  const newReply = await prisma.reply.create({
    data: rest,
  });
  return sendData(200, "Reply created successfully", newReply);
};

export const updateReply = async (
  id: string,
  updatedReply: CreateReplyType
) => {
  try {
    await prisma.reply.update({
      where: { id },
      data: updatedReply,
    });
    return sendData(200, "Reply updated successfully");
  } catch (error) {
    return sendData(400, "Reply not updated");
  }
};

export const getSingleReply = async (replyId: string) => {
  const reply = await prisma.reply.findFirst({
    where: { id: replyId },
  });

  if (!reply) {
    return sendData(400, "Reply not found by id");
  }

  return sendData(200, "Reply retrieved successfully", reply);
};

export const getAllReplyByUser = async (userId: string) => {
  const replies = await prisma.reply.findMany({
    where: { userId: userId },
  });
  return sendData(200, "Replies retrieved successfully", replies);
};

export const getAllReplyByComment = async (commentId: string) => {
  const replies = await prisma.reply.findMany({
    where: { commentId },
  });
  return sendData(200, "Replies retrieved successfully", replies);
};

export const deleteReply = async (replyId: string) => {
  try {
    await prisma.reply.delete({
      where: { id: replyId },
    });

    return sendData(200, "Reply deleted successfully");
  } catch (error) {
    return sendData(400, "Reply not deleted");
  }
};
