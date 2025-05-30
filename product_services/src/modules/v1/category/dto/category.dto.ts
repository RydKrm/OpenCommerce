import { z } from "zod";

export const CreateCategoryDto = z.object({
  name: z
    .string({ message: "Category name is required" })
    .min(3, { message: "Name must be greater then 3 5 character" })
    .max(255, { message: "Name must be less then 255 character" })
    .nonempty(),
  image: z.string().optional(),
  description: z.string({ message: "Description is required" }).nonempty(),
  parentId: z.string({ message: "Parent ID is required" }).optional(),
});

export const UpdateCategoryDto = z.object({
  name: z
    .string({ message: "Category name is required" })
    .min(3, { message: "Name must be greater then 3 5 character" })
    .max(255, { message: "Name must be less then 255 character" })
    .optional(),
  description: z.string({ message: "Description is required" }).optional(),
  parentId: z.string({ message: "Parent ID is required" }).optional(),
});

export type CreateCategoryType = z.infer<typeof CreateCategoryDto>;
export type UpdateCategoryType = z.infer<typeof UpdateCategoryDto>;
