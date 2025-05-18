import z from "zod";

export const createInventoryDto = z.object({
  productId: z.string().min(3),
  userId: z.string().optional(),
  quantity: z.number().min(1),
  price: z.number().optional(),
});

export const updateInventoryDto = createInventoryDto.partial();

export type CreateInventoryDto = z.infer<typeof createInventoryDto>;
export type UpdateInventoryDto = z.infer<typeof updateInventoryDto>;
