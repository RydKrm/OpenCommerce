import prisma from "@/database/prisma";
import { IReply } from "../interface/reply.interface";

class ReplyCrudService {
  async create(data: IReply) {
    const newReply = await prisma.reply.create({
      data,
    });
    return newReply;
  }

  async update(id: number, updatedReply: IReply) {
    await prisma.reply.update({
      where: { id },
      data: updatedReply,
    });
  }

  async getSingle(replyId: number) {
    const reply = await prisma.reply.findFirst({
      where: { id: replyId },
    });
    return reply;
  }

  async getAllReplyByUser(userId: number) {
    const replies = await prisma.reply.findMany({
      where: { userId },
    });
    return replies;
  }

  async getAllReplyByComment(commentId: number) {
    const replies = await prisma.reply.findMany({
      where: { commentId },
    });
    return replies;
  }

  async deleteReply(replyId: number) {
    await prisma.reply.delete({
      where: { id: replyId },
    });
  }
}

const replyCrudService = new ReplyCrudService();
export default replyCrudService;
