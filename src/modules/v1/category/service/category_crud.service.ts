import prisma from "@/database/prisma";
import { ICategory } from "../interface/category.interface";

interface CategoryWithChildren {
  id: number;
  name: string;
  children: CategoryWithChildren[]; // Recursive type for children
}

class CategoryService {
  create = async (data: ICategory) => {
    const isExists = await prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (isExists) {
      throw new Error("Category already exists with this name");
    }

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
  // getAllCategory = async () => {
  //   const categories = await prisma.category.findMany({
  //     include: {
  //       childern: true,
  //     },
  //     where: {
  //       parentId: null,
  //     },
  //   });
  //   return categories;
  // };

  // getAllCategory = async () => {
  //   const categoryList = (await prisma.$queryRaw`
  //   WITH RECURSIVE category_tree AS (
  //     SELECT id, name, parent_id
  //     FROM "Category"
  //     WHERE parent_id IS NULL
  //     UNION ALL
  //     SELECT c.id, c.name, c.parent_id
  //     FROM "Category" c
  //     INNER JOIN category_tree ct ON c.parent_id = ct.id
  //   )
  //   SELECT * FROM category_tree;
  // `) as ICategory[];

  //   const categoryMap = new Map();
  //   const roots: any[] = [];

  //   // Step 1: Map categories by ID
  //   categoryList.forEach((category) => {
  //     categoryMap.set(category.id, { ...category, children: [] });
  //   });

  //   // Step 2: Build the tree structure
  //   categoryList.forEach((category) => {
  //     if (category.parentId) {
  //       // If the category has a parent, push it to the parent's children array
  //       categoryMap
  //         .get(category.parentId)
  //         .children.push(categoryMap.get(category.id));
  //     } else {
  //       // If it has no parent (root category), add it to the root categories list
  //       roots.push(categoryMap.get(category.id));
  //     }
  //   });

  //   return roots;
  // };

  // Recursive function to build the category tree

  buildCategoryTree = async (
    parentId: number | null = null
  ): Promise<CategoryWithChildren[]> => {
    const categories = await prisma.category.findMany({
      where: {
        parentId: parentId,
      },
      include: {
        childern: true, // Fix typo here from `childern` to `children`
      },
    });

    if (categories.length === 0) return [];

    return Promise.all(
      categories.map(async (category) => {
        const data: CategoryWithChildren = {
          id: category.id,
          name: category.name,
          children: await this.buildCategoryTree(category.id),
        };
        return data;
      })
    );
  };

  getAllCategory = async () => {
    const categories = await this.buildCategoryTree();
    return categories;
  };

  deleteTree = async (id: number): Promise<void> => {
    // Find the category with its children
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        childern: true, // Include the children of the category
      },
    });

    if (!category) return;

    // Delete all child categories first
    for (const child of category.childern) {
      await this.deleteTree(child.id); // Recursively delete the child
      await prisma.category.delete({
        where: {
          id: child.id, // Delete each child category
        },
      });
    }
  };

  // delete category
  deleteCategory = async (id: number) => {
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
            childern: {
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
  };
}

const categoryService = new CategoryService();
export default categoryService;
