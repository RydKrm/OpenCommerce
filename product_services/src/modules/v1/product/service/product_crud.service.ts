import prisma from "@/database/prisma";
import { CreateProductType, UpdateProductType } from "../dto/product.crud.dto";
import sendData from "@/lib/response/send_data";
import { IQuery } from "@/types/IQuery";
import { generateSlug } from "@/utils/generate-slug";
import generateSKU from "@/utils/generate-sku";

class ProductCrudService {
  async createProduct(product: CreateProductType) {
    const { images, variants = [], properties = [], ...rest } = product;
    const category = await prisma.category.findFirst({
      where: {
        id: rest.categoryId,
      },
    });

    console.log("category not present ----------------------------------- ");

    if (!category) return sendData(400, "Category not found by id");

    // create slug from product name
    const slug = generateSlug(rest.name);
    const sku = generateSKU(rest.name, category.name);

    const newProduct = await prisma.product.create({
      data: {
        ...rest,
        slug,
        Images: {
          create: images.map((image) => ({
            image_url: image,
            image_type: "product",
          })),
        },
        // Product_Property: {
        //   createMany: {
        //     data: properties?.map((prop) => ({
        //       key: prop.key,
        //       value: prop.value,
        //     })),
        //   },
        // },
        // Product_Variant: {
        //   createMany: {
        //     data: variants?.map((variant) => ({
        //       price: variant.price,
        //       previousPrice: variant.previousPrice,
        //       quantity: variant.quantity,
        //       sku: sku,
        //       image: variant.image,
        //       Product_Property: {
        //         create: variant.properties?.map((vp) => ({
        //           key: vp.key,
        //           value: vp.value,
        //         })),
        //       },
        //     })),
        //   },
        // },
      },
      include: {
        Images: true,
        Product_Property: true,
        Product_Variant: {
          include: {
            Product_Property: true,
          },
        },
      },
    });

    return sendData(200, "Product created successfully", newProduct);
  }

  async updateProduct(id: string, updatedProduct: UpdateProductType) {
    const { images, properties, variants, ...rest } = updatedProduct;

    // Clear old properties and variants if needed
    await prisma.product_Property.deleteMany({
      where: { productId: id },
    });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...rest,
        // Product_Property: {
        //   create: properties?.map((prop) => ({
        //     key: prop.key,
        //     value: prop.value,
        //   })),
        // },
        // Note: updating variants should ideally be handled separately
      },
      include: {
        Product_Property: true,
      },
    });

    return sendData(200, "Product updated successfully", updated);
  }

  async updateProductStatus(productId: string) {
    const isExists = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!isExists) throw new Error("Product not found by id");

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { status: !isExists.status },
    });
    return sendData(200, "Product status updated successfully", updatedProduct);
  }

  async deleteProduct(id: string) {
    const isExist = await prisma.product.findFirst({ where: { id } });
    if (!isExist) return sendData(400, "Product not found by id");

    await prisma.product.delete({ where: { id } });

    return sendData(200, "Product deleted successfully");
  }

  async getAllProducts(query: IQuery) {
    const { limit = 10, skip = 0, search = "", categoryId } = query;

    const filter: any = {};
    if (categoryId) filter.categoryId = categoryId;
    if (search) {
      filter.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    const products = await prisma.product.findMany({
      where: filter,
      take: Number(limit),
      skip: Number(skip),
      orderBy: { createdAt: "desc" },
      include: {
        Images: true,
        Category: true,
        Product_Variant: {
          include: { Product_Property: true },
        },
        Product_Property: true,
      },
    });

    const total = await prisma.product.count({ where: filter });

    return sendData(200, "Products fetched successfully", {
      list: products,
      total,
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
        Product_Property: true,
        Product_Variant: {
          include: {
            Product_Property: true,
          },
        },
      },
    });
    if (!product) return sendData(400, "Product not found by id");

    return sendData(200, "Product fetched successfully", product);
  }
}

const productCrudService = new ProductCrudService();
export default productCrudService;
