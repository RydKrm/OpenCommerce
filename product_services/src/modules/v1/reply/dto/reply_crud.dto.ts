import { z } from "zod";

export const CreateReplyDto = z.object({
  commentId: z.string().min(1),
  userId: z.string().min(1),
  content: z.string().min(1),
  images: z.array(z.string()).optional(),
});

export const UpdateReplyDto = CreateReplyDto.partial();

export type CreateReplyType = z.infer<typeof CreateReplyDto>;
export type UpdateReplyType = z.infer<typeof UpdateReplyDto>;
