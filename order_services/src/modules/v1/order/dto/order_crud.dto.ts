import z from "zod";
import express from "express";

class OrderCrudDto {
  create = z.object({
    userId: z.number({ message: "User id is required" }),
    addressId: z.string({ message: "Address id is required" }),
    totalAmount: z.number({ message: "Total price is required" }),
    orderItems: z.array(
      z.object({
        productId: z.number({ message: "Product id is required" }),
        orderId: z.number({ message: "Order id is required" }),
        quantity: z
          .number({ message: "Quantity is required" })
          .positive({ message: "Quantity must be a positive number" }),
        price: z.number({ message: "Price is required" }).positive({
          message: "Price must be a positive number",
        }),
      })
    ),
  });

  update = z
    .object({
      addressId: z.string().optional(),
      totalAmount: z.number().optional(),
      orderItems: z
        .array(
          z.object({
            productId: z.number().optional(),
            orderId: z.number().optional(),
            quantity: z
              .number()
              .positive({ message: "Quantity must be a positive number" })
              .optional(),
            price: z
              .number()
              .positive({ message: "Price must be a positive number" })
              .optional(),
          })
        )
        .optional(),
    })
    .strict() // Ensures no extra fields are allowed
    .refine((data) => !("userId" in data), {
      message: "Updating userId is not allowed",
    });
}

const orderCrudDto = new OrderCrudDto();
export default orderCrudDto;
