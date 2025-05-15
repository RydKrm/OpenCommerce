import { Request, Response } from "express";
import imageService from "../../image/image.service";
import commentCrudService from "../services/comment_crud.service";
import prisma from "@/database/prisma";
import { negativeResponse, positiveResponse } from "@/lib/response/response";

class CommentCrudController {
  async create(req: Request, res: Response) {
    try {
      const userId = Number(req.headers.userid);

      const imageFiles = (req.files as Express.Multer.File[]) || [];

      const imageList: String[] = [];

      imageFiles.forEach(async (file) => {
        const imageData = await imageService.uploadImage(file);
        imageList.push(imageData.sourceUrl);
        const newImage = await prisma.images.create({
          data: {
            image_url: imageData.sourceUrl,
            imageble_type: "comment",
            imageble_id: newComment.id,
            public_id: imageData.publicId,
          },
        });
      });
      const newComment = await commentCrudService.create({
        ...req.body,
        userId,
      });
      return positiveResponse(res, "New comment created successfully", {
        data: { ...newComment, userId },
        imageList,
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getSingleComment(req: Request, res: Response) {
    try {
      const comment = await commentCrudService.getSingleComment(
        Number(req.params.id)
      );
      return positiveResponse(res, "Comment found successfully", {
        data: comment,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllCommentByPost(req: Request, res: Response) {
    try {
      const data = await commentCrudService.getAllByPost(req);
      return positiveResponse(res, "Comments retrieved successfully", {
        data,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllCommentByProduct(req: Request, res: Response) {
    try {
      const data = await commentCrudService.getAllByProduct(req);
      return positiveResponse(res, "Comments retrieved successfully", {
        data,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllCommentByReview(req: Request, res: Response) {
    try {
      const data = await commentCrudService.getAllByReview(req);
      return positiveResponse(res, "Comments retrieved successfully", {
        data,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllCommentByUser(req: Request, res: Response) {
    try {
      const data = await commentCrudService.getAllByUser(req);
      return positiveResponse(res, "Comments retrieved successfully", {
        data,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedComment = await commentCrudService.updateComment(
        Number(req.params.commentId),
        req.body
      );
      const imageList: String[] = [];

      if (req.files) {
        const imageFiles = (req.files as Express.Multer.File[]) || [];

        // get previous images
        const previousImages = await prisma.images.findMany({
          where: {
            imageble_type: "comment",
            imageble_id: updatedComment.id,
          },
        });

        // delete all previous images from the list
        previousImages.forEach(async (image) => {
          await imageService.deleteImage(image.public_id);
          await prisma.images.delete({
            where: {
              image_id: image.image_id,
            },
          });
        });

        // upload new images
        imageFiles.forEach(async (file) => {
          // save new images to database
          const imageData = await imageService.uploadImage(file);
          imageList.push(imageData.sourceUrl);
          const newImage = await prisma.images.create({
            data: {
              image_url: imageData.sourceUrl,
              imageble_type: "comment",
              imageble_id: updatedComment.id,
              public_id: imageData.publicId,
            },
          });
        });
      }
      return positiveResponse(res, "Comment created successfully", {
        data: updatedComment,
        imageList,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }
  async deleteComment(req: Request, res: Response) {
    try {
      await commentCrudService.deleteComment(Number(req.params.commentId));
      return positiveResponse(res, "Comment deleted successfully");
    } catch (err: any) {
      negativeResponse(res, err.message);
    }
  }
}

const commentCrudController = new CommentCrudController();

export default commentCrudController;
