import prisma from "@/database/prisma";
import { ICategory } from "../interface/category.interface";

class CategoryService {
  create = async (data: ICategory) => {
    const newCategory = await prisma.category.create({
      data: {
        ...data,
        parentId: data.parentId ? data.parentId : null,
        totalItem: data.totalItem ? data.totalItem : 0,
      },
    });
    return newCategory;
  };

  updateCategory = async (id: number, data: ICategory) => {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return updatedCategory;
  };

  getSingle = async (id: number) => {
    const category = await prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        childern: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!category) {
      throw new Error("Category not found by id");
    }

    return category;
  };

  // get all categories
  getAllCategory = async () => {
    const categories = await prisma.category.findMany({
      include: {
        childern: true,
      },
    });
    return categories;
  };

  // delete category
  deleteCategory = async (id: number) => {
    const isExist = await prisma.category.findFirst({
      where: { id },
    });
    if (!isExist) {
      throw new Error("Category not found by id");
    }
    await prisma.category.delete({
      where: { id },
    });
  };
}

const categoryService = new CategoryService();
export default categoryService;
