import z from "zod";

export const createReviewDto = z.object({
  userId: z.string(),
  productId: z.string(),
  rating: z.number().min(1).max(5),
  description: z.string().min(1),
  images: z.array(z.string()),
});
export const updateReviewDto = createReviewDto.partial();

export type CreateReviewType = z.infer<typeof createReviewDto>;
export type UpdateReviewType = z.infer<typeof updateReviewDto>;
