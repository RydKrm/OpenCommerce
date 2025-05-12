import { z } from "zod";

export const CreateProductDto = z
  .object({
    name: z
      .string({ message: "Product name is required" })
      .min(3, { message: "Name must be greater than 5 character" }),
    categoryId: z.string({ message: "Category Id is required" }),
    images: z.array(z.string()),
    price: z
      .string({ message: "Price is required" })
      .transform((item) => Number(item)),
    previousPrice: z
      .string()
      .transform((item) => Number(item))
      .optional(),
    description: z
      .string({ message: "Description is required" })
      .min(10, { message: "Description must be greater than 10 character" }),
    quantity: z
      .string({ message: "Quantity field is required" })
      .transform((item) => Number(item)),
    rating: z
      .string()
      .transform((item) => Number(item))
      .optional(),
  })
  .strict();

export const UpdateProductDto = CreateProductDto.partial();

export type CreateProductType = z.infer<typeof CreateProductDto>;
export type UpdateProductType = z.infer<typeof UpdateProductDto>;
