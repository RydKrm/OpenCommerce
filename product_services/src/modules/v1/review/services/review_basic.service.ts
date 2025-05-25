import sendData from "@/lib/response/send_data";
import prisma from "@/database/prisma";
import { IQuery } from "@/types/IQuery";
import {
  createReviewDto,
  CreateReviewType,
  UpdateReviewType,
  updateReviewDto,
} from "../dto/review.dto";

export const CreateReview = async (data: CreateReviewType) => {
  try {
    const isCreated = await prisma.reviews.create({
      data,
    });

    if (isCreated) {
      return sendData(200, "Review created successfully", isCreated);
    }
    return sendData(400, "Review not created");
  } catch (err) {
    return sendData(500, "Internal server error", err);
  }
};

export const GetSingleReview = async (id: string) => {
  try {
    const review = await prisma.reviews.findUnique({
      where: { id },
      include: {
        Product: true,
        Images: true,
        Comment: true,
      },
    });

    if (review) {
      return sendData(200, "Review retrieved successfully", review);
    }
    return sendData(404, "Review not found by id");
  } catch (err) {
    return sendData(500, "Internal server error", err);
  }
};

export const GetReviewsByUser = async (userId: string, query: IQuery) => {
  try {
    const reviews = await prisma.reviews.findMany({
      where: { userId },
      skip: Number(query.skip) || 0,
      take: Number(query.limit) || 10,
      include: {
        Product: true,
        Images: true,
        Comment: true,
      },
    });

    return sendData(200, "Reviews by user retrieved successfully", reviews);
  } catch (err) {
    return sendData(500, "Internal server error", err);
  }
};

export const GetReviewsByProduct = async (productId: string, query: IQuery) => {
  try {
    const reviews = await prisma.reviews.findMany({
      where: { productId },
      skip: Number(query.skip) || 0,
      take: Number(query.limit) || 10,
      include: {
        Product: true,
        Images: true,
        Comment: true,
      },
    });

    return sendData(200, "Reviews by product retrieved successfully", reviews);
  } catch (err) {
    return sendData(500, "Internal server error", err);
  }
};

export const UpdateReview = async (id: string, data: UpdateReviewDto) => {
  try {
    const existing = await prisma.reviews.findUnique({ where: { id } });

    if (!existing) {
      return sendData(404, "Review not found");
    }

    const updated = await prisma.reviews.update({
      where: { id },
      data,
    });

    return sendData(200, "Review updated successfully", updated);
  } catch (err) {
    return sendData(500, "Internal server error", err);
  }
};

export const DeleteReview = async (id: string) => {
  try {
    const existing = await prisma.reviews.findUnique({ where: { id } });

    if (!existing) {
      return sendData(404, "Review not found");
    }

    const deleted = await prisma.reviews.delete({ where: { id } });

    return sendData(200, "Review deleted successfully", deleted);
  } catch (err) {
    return sendData(500, "Internal server error", err);
  }
};
