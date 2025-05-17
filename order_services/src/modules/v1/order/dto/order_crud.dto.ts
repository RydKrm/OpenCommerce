import z from "zod";
import { DiscountType } from "@prisma/client";

export const OrderItemDto = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive(),
  discountPrice: z.number().optional(),
  categoryId: z.string(),
});

export const CreateOrderDto = z.object({
  userId: z.string(),
  addressId: z.string(),
  totalAmount: z.number(),
  subTotalAmount: z.number().min(1),
  vat: z.number().optional(),
  discount: z.number().optional(),
  discountType: z
    .enum([
      DiscountType.CODE,
      DiscountType.MEMBERSHIP,
      DiscountType.NO_DISCOUNT,
      DiscountType.YEARLY,
    ])
    .optional(),
  orderItems: z.array(OrderItemDto),
});

export type OrderItemType = z.infer<typeof OrderItemDto>;
export type CreateOrderType = z.infer<typeof CreateOrderDto>;
