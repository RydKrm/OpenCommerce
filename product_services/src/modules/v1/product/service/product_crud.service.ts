import prisma from "@/database/prisma";
import { CreateProductType, UpdateProductType } from "../dto/product.crud.dto";
import sendData from "@/lib/response/send_data";
import { IQuery } from "@/types/IQuery";

class ProductCrudService {
  async createProduct(product: CreateProductType) {
    const { images, ...rest } = product;
    const newProduct = await prisma.product.create({
      data: {
        ...rest,
        Images: {
          create: images.map((image) => ({
            image_url: image,
            image_type: "product",
          })),
        },
      },
      include: {
        Images: {
          select: {
            image_id: true,
            image_type: true,
            image_url: true,
          },
        },
      },
    });

    return sendData(200, "Product created successfully", newProduct);
  }
  async updateProduct(id: string, updatedProduct: UpdateProductType) {
    const updateProduct = await prisma.product.update({
      where: { id },
      data: updatedProduct,
    });
    return sendData(200, "Product updated successfully", updateProduct);
  }

  async updateProductStatus(productId: string) {
    const isExists = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!isExists) {
      throw new Error("Product not found by id");
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { status: !isExists.status },
    });
    return sendData(200, "Product status updated successfully", updatedProduct);
  }

  async deleteProduct(id: string) {
    const isExist = await prisma.product.findFirst({
      where: { id },
    });
    if (!isExist) {
      return sendData(400, "Product not found by id");
    }

    await prisma.product.delete({
      where: { id },
    });

    return sendData(200, "Product deleted successfully");
  }

  async getAllProducts(query: IQuery) {
    const { limit = 10, skip = 0, search = "", categoryId } = query;

    const find: any = {};

    if (categoryId) {
      find["categoryId"] = categoryId;
    }

    if (search) {
      find["name"] = {
        contains: search,
        mode: "insensitive",
      };
    }

    const products = await prisma.product.findMany({
      where: find,
      take: Number(limit),
      skip: Number(skip),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Images: true,
        Category: true,
      },
    });

    const total = await prisma.product.count({
      where: find,
    });

    return sendData(200, "Products fetched successfully", {
      list: products,
      total: total,
    });
  }

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        Images: true,
        Category: true,
        Comment: true,
        Reaction: true,
        Reviews: true,
      },
    });
    if (!product) {
      return sendData(400, "Product not found by id");
    }
    return sendData(200, "Product fetched successfully", product);
  }
}
const productCrudService = new ProductCrudService();

export default productCrudService;
