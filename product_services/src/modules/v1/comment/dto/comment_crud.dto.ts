import { z } from "zod";

class CommentCrudDto {
  create = z.object({
    productId: z.number({ message: "Product Id is required" }).optional(),
    userId: z.number({ message: "User Id is required" }),
    commentText: z.string({ message: "Content is required" }),
    blogId: z.number({ message: "Blog Id is required" }).optional(),
    postId: z.number({ message: "Post Id is required" }).optional(),
    reviewId: z.number({ message: "Review Id is required" }).optional(),
  });
  update = z.object({
    content: z.string({ message: "Content is required" }).optional(),
  });
}

const commentCrudDto = new CommentCrudDto();
export default commentCrudDto;
