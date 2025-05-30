import { z } from "zod";

export const ProductProperty = z.array(
  z.object({
    productId: z.string().optional(),
    variantId: z.string().optional(),
    key: z.string(),
    value: z.string(),
  })
);

export const ProductVariant = z.object({
  price: z.number().transform((item) => Number(item)),
  previousPrice: z
    .number()
    .transform((item) => Number(item))
    .optional(),
  quantity: z.number().transform((item) => Number(item)),
  properties: z
    .array(
      z.object({
        productId: z.string().optional(),
        variantId: z.string().optional(),
        key: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});

export const CreateProductDto = z.object({
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
  variants: z
    .string()
    .transform((item) => {
      const variantArray = JSON.parse(item);
      console.log("variant items  ", variantArray);
      return variantArray.map((item: any) => {
        ProductVariant.parse(item);
        return item;
      });
    })
    .optional(),
  properties: z
    .string()
    .transform((value) => {
      return ProductProperty.parse(JSON.parse(value));
    })
    .optional(),
});

export const UpdateProductDto = CreateProductDto.partial();

export type CreateProductType = z.infer<typeof CreateProductDto>;
export type UpdateProductType = z.infer<typeof UpdateProductDto>;
