import { z } from "zod";

class ProductCrudDto {
  create = z.object({
    name: z
      .string({ message: "Product name is required" })
      .min(3, { message: "Name must be greater than 5 character" }),
    categoryId: z.number({ message: "Category Id is required" }),
    sellerId: z.number().optional(),
    price: z
      .number({ message: "Price is required" })
      .positive({ message: "Price must me positive number" }),
    previousPrice: z
      .number()
      .positive({ message: "Price must be a positive number" })
      .optional(),
    description: z
      .string({ message: "Description is required" })
      .min(10, { message: "Description must be greater than 10 character" }),
    quantity: z
      .number({ message: "Quantity field is required" })
      .min(1, { message: "Product quantity must be positive number" }),
    rating: z
      .number()
      .min(0, { message: "Rating is minimum 0 and max 5 " })
      .max(5, { message: "Rating is minimum 0 and max 5 " })
      .optional(),
    tag: z.array(z.string()).optional(),
  });

  update = z.object({
    name: z
      .string({ message: "Product name is required" })
      .min(3, { message: "Name must be greater than 5 character" })
      .optional(),
    categoryId: z.number({ message: "Category Id is required" }).optional(),
    price: z
      .number({ message: "Price is required" })
      .positive({ message: "Price must me positive number" })
      .optional(),
    previousPrice: z
      .number()
      .positive({ message: "Price must be a positive number" })
      .optional(),
    description: z
      .string({ message: "Description is required" })
      .min(10, { message: "Description must be greater than 10 character" })
      .optional(),
    quantity: z
      .number({ message: "Quantity field is required" })
      .min(1, { message: "Product quantity must be positive number" })
      .optional(),
    rating: z
      .number()
      .min(0, { message: "Rating is minimum 0 and max 5 " })
      .max(5, { message: "Rating is minimum 0 and max 5 " })
      .optional(),
    tag: z.array(z.string()).optional(),
  });
}

const productCrudDto = new ProductCrudDto();

export default productCrudDto;
