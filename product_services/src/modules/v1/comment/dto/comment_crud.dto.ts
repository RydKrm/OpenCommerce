import { z } from "zod";

export const CreateCommentDto = z.object({
  productId: z.string(),
  commentText: z.string(),
  images: z.string(z.string()).optional(),
  blogId: z.string().optional(),
  postId: z.string().optional(),
  reviewId: z.string().optional(),
});

export const UpdateCommentDto = CreateCommentDto.partial();

export type CreateCommentDtoType = z.infer<typeof CreateCommentDto>;
export type UpdateCommentDtoType = z.infer<typeof UpdateCommentDto>;
