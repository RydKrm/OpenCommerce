import prisma from "@/database/prisma";
import { IProduct } from "../interface/product.interface";

class ProductCrudService {
  async createProduct(product: IProduct) {
    const newProduct = await prisma.product.create({
      data: product,
    });
  }

  async updateProduct(id: number, updatedProduct: IProduct) {
    await prisma.product.update({
      where: { id },
      data: updatedProduct,
    });
  }

  async updateProductStatus(id: number) {
    const isExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!isExists) {
      throw new Error("Product not found by id");
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { status: !isExists.status },
    });
    return updatedProduct;
  }

  async deleteProduct(id: number) {
    const isExist = await prisma.product.findFirst({
      where: { id },
    });
    if (!isExist) {
      throw new Error("Product not found by id");
    }

    await prisma.product.delete({
      where: { id },
    });
  }

  async getAllProducts() {
    const products = await prisma.product.findMany({});
    return products;
  }

  async getProductById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new Error("Product not found by id");
    }
    return product;
  }

  // Search product by name
  async searchProductByName(name: string) {
    const products = await prisma.product.findMany({
      where: {
        name: { contains: name },
      },
    });
    return products;
  }

  async findAllProductByCategory(category: number) {
    const products = await prisma.product.findMany({
      where: {
        categoryId: category,
      },
    });
    return products;
  }

  async findAllProductByVendor(vendorId: number) {
    const products = await prisma.product.findMany({
      where: {
        vendorId: vendorId,
      },
    });
    return products;
  }
}

const productCrudService = new ProductCrudService();

export default productCrudService;
