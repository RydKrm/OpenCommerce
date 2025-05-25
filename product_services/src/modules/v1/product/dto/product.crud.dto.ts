import { z } from "zod";

export const ProductProperty = z.object({
  productId: z.string().optional(),
  variantId: z.string().optional(),
  key: z.string(),
  value: z.string(),
});

export const ProductVariant = z.object({
  productId: z.string(),
  price: z.number(),
  previousPrice: z.number().optional(),
  quantity: z.number(),
  image: z.string(),
  properties: z.array(ProductProperty),
});

export const CreateProductDto = z
  .object({
    name: z.string().min(3),
    categoryId: z.string(),
    images: z.array(z.string()),
    price: z.string().transform((item) => Number(item)),
    previousPrice: z
      .string()
      .transform((item) => Number(item))
      .optional(),
    description: z.string().min(10),
    quantity: z.string().transform((item) => Number(item)),
    variants: z.array(ProductVariant).optional(),
    properties: z.array(ProductProperty).optional(),
  })
  .strict();

export const UpdateProductDto = CreateProductDto.partial();

export type CreateProductType = z.infer<typeof CreateProductDto>;
export type UpdateProductType = z.infer<typeof UpdateProductDto>;
