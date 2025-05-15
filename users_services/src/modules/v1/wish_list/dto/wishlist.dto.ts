import z from "zod";

export const CreateWishlistDto = z
  .object({
    productId: z.string({ message: "Product id is required" }),
    userId: z.string({ message: "User id is required" }),
  })
  .strict();

export const UpdateWishlistDto = CreateWishlistDto.partial();

export type CreateWishlistDtoType = z.infer<typeof CreateWishlistDto>;
export type UpdateWishlistDtoType = z.infer<typeof UpdateWishlistDto>;
