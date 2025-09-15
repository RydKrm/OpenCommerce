import prisma from "@/database/prisma";
import { CreateCategoryType, UpdateCategoryType } from "../dto/category.dto";
import sendData from "@/lib/response/send_data";

interface CategoryWithChildren {
  id: string;
  name: string;
  description: string;
  totalItem: number;
  image: string | null;
  children: CategoryWithChildren[];
}

class CategoryService {
  create = async (data: CreateCategoryType) => {
    const isExists = await prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (isExists) {
      return sendData(400, "Category already exists with this name");
    }

    const newCategory = await prisma.category.create({
      data: {
        ...data,
        parentId: data.parentId ? data.parentId : null,
        image: data.image?.length ? data.image[0] : null,
      },
    });
    return sendData(200, "Category created successfully", newCategory);
  };

  updateCategory = async (id: string, data: UpdateCategoryType) => {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return sendData(200, "Category updated successfully", updatedCategory);
  };

  getSingle = async (id: string) => {
    const category = await prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        children: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!category) {
      return sendData(404, "Category not found");
      // throw new Error("Category not found by id");
    }

    return sendData(200, "Category found successfully", category);
  };

  buildCategoryTree = async (
    parentId: string | null = null
  ): Promise<CategoryWithChildren[]> => {
    const categories = await prisma.category.findMany({
      where: {
        parentId: parentId,
      },
      select: {
        children: true,
        id: true,
        name: true,
        description: true,
        totalItem: true,
        image: true,
      },
    });

    if (categories.length === 0) return [];

    return Promise.all(
      categories.map(async (category) => {
        const data: CategoryWithChildren = {
          id: category.id,
          name: category.name,
          description: category.description,
          totalItem: category.totalItem,
          image: category?.image || null,
          children: await this.buildCategoryTree(category.id),
        };
        return data;
      })
    );
  };

  getAllCategory = async () => {
    const categories = await this.buildCategoryTree();
    return sendData(200, "Category found successfully", categories);
  };

  deleteTree = async (id: string): Promise<void> => {
    // Find the category with its children
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
      },
    });

    if (!category) return;

    // Delete all child categories first
    try {
      for (const child of category.children) {
      await this.deleteTree(child.id); // Recursively delete the child
      await prisma.category.delete({
        where: {
          id: child.id, // Delete each child category
        },
      });
    }
    } catch (error) {
      throw new Error("Failed to delete child categories");
    }
  };

  // delete category
  deleteCategory = async (id: string) => {
    const isExist = await prisma.category.findFirst({
      where: { id },
    });
    if (!isExist) {
      throw new Error("Category not found by id");
    }

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error("Category not found by id");
    }

    try {
      
    // Delete the category and its subcategories
    await this.deleteTree(id);

    // If the category has a parent, remove it from the parent's children list
    if (category.parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: {
          id: category.parentId,
        },
      });

      if (parentCategory) {
        // Update the parent's children list by removing the deleted category
        await prisma.category.update({
          where: {
            id: parentCategory.id,
          },
          data: {
            children: {
              disconnect: {
                id: category.id,
              },
            },
          },
        });
      }
    }

    // Finally, delete the category itself
    await prisma.category.delete({
      where: {
        id,
      },
    });
     return sendData(200, "Category deleted successfully");
    } catch (error : any) {
      if(error.code === 'P2014') {
        return sendData(400,"Cannot delete category with existing products. Please remove associated products first.");
      } else {
        return sendData(400,"Failed to delete category");
      }
    }
  };
}

const categoryService = new CategoryService();
export default categoryService;
