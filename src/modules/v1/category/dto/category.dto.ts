import { z } from "zod";

class CategoryDto {
  create = z.object({
    name: z
      .string({ message: "Category name is required" })
      .min(3, { message: "Name must be greater then 3 5 character" })
      .max(255, { message: "Name must be less then 255 character" })
      .nonempty(),
    description: z.string({ message: "Description is required" }).nonempty(),
    parentId: z.number({ message: "Parent ID is required" }).optional(),
  });

  updateCategory = z.object({
    name: z
      .string({ message: "Category name is required" })
      .min(3, { message: "Name must be greater then 3 5 character" })
      .max(255, { message: "Name must be less then 255 character" })
      .optional(),
    description: z.string({ message: "Description is required" }).optional(),
    parentId: z.number({ message: "Parent ID is required" }).optional(),
  });
}

const categoryDto = new CategoryDto();
export default categoryDto;
