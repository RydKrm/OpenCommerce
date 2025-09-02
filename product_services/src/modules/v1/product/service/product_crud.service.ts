import { ProductVariantType } from "./../dto/product.crud.dto";
import prisma from "@/database/prisma";
import { CreateProductType, UpdateProductType } from "../dto/product.crud.dto";
import sendData from "@/lib/response/send_data";
import { IQuery } from "@/types/IQuery";
import { generateUniqueSlug } from "@/utils/generate-slug";
import generateSKU from "@/utils/generate-sku";

interface IProductVariant extends ProductVariantType {
  id: string;
  image: string;
}

class ProductCrudService {
  async createProduct(product: CreateProductType) {
    const { images = [], variants = [], properties = [], ...rest } = product;
    const category = await prisma.category.findFirst({
      where: {
        id: rest.categoryId,
      },
    });

    const productVariants = variants as IProductVariant[];

    if (!category) return sendData(400, "Category not found by id");

    // create slug from product name
    const slug = generateUniqueSlug(rest.name);
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
        Product_Property: {
          createMany: {
            data: properties?.map((prop) => ({
              key: prop.key,
              value: prop.value,
            })),
          },
        },
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

    if (!newProduct) return sendData(400, "Product not created");

    // if the many product created successfully, we can now create variants
    // and their properties are also created

    for (const variant of productVariants) {
      const variantProperties =
        variant.properties?.map((prop) => ({
          productId: newProduct.id,
          key: prop.key,
          value: prop.value,
        })) || [];

      const variantData = {
        price: variant.price,
        previousPrice: variant.previousPrice,
        quantity: variant.quantity,
        image: variant.image,
        productId: newProduct.id,
        sku: sku,
      };

      // Create the variant with its properties
      const createdVariant = await prisma.product_Variant.create({
        data: {
          ...variantData,
          Product_Property: {
            createMany: {
              data: variantProperties,
            },
          },
        },
      });
    }

    const getProduct = await prisma.product.findUnique({
      where: { id: newProduct.id },
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

    return sendData(200, "Product created successfully", getProduct);
  }

  async createProductV2(product: CreateProductType) {
    const { images = [], variants = [], properties = [], ...rest } = product;
    const category = await prisma.category.findFirst({
      where: {
        id: rest.categoryId,
      },
    });
    if (!category) return sendData(400, "Category not found by id");

    const sku = generateSKU(rest.name, category?.name || "general");
    
    // create slug from product name
    const slug = generateUniqueSlug(rest.name);

    const newProduct = await prisma.product.create({
      data: {
        ...rest,
        slug,
        sku,
        Images: {
          create: images.map((image) => ({
            image_url: image,
            image_type: "product",
          }))
        }
        
      }})

    return sendData(200, "Product V2 created successfully", newProduct);
  }  

  async addedImagesInVariant(
    variants: IProductVariant[],
    imagesList: { id: string; image_url: string }[]
  ) {
    const variantsWithImages = variants.map((variant) => {
      const image = imagesList.find((image) => image.id === variant.id);
      if (image) {
        variant.image = image.image_url;
      }
      return variant;
    });
    return variantsWithImages;
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
    const {
      limit = 10,
      skip = 0,
      search = "",
      categoryId,
      minPrice,
      maxPrice,
      sortBy,
    } = query;

    const filter: any = {};
    if (categoryId) {
      const categoryList = categoryId.split(",");
      filter.OR = [];
      categoryList.forEach((category) => {
        filter.OR.push({
          categoryId: category,
        });
      });
    }
    if (search) {
      filter.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (minPrice && maxPrice) {
      filter.AND = [
        {
          price: {
            gte: Number(minPrice),
            lte: Number(maxPrice),
          },
        },
      ];
    }

    let orderBy: any = { createdAt: "desc" };

    if (sortBy === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sortBy === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sortBy === "name_asc") {
      orderBy = { name: "asc" };
    } else if (sortBy === "rating_desc") {
      orderBy = { Reviews: { _count: "desc" } };
    }

    console.log("filter ", filter);

    const products = await prisma.product.findMany({
      where: filter,
      take: Number(limit),
      skip: Number(skip),
      orderBy,
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

  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
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
    if (!product) return sendData(400, "Product not found by slug");

    return sendData(200, "Product fetched successfully", product);
  }
}

const productCrudService = new ProductCrudService();
export default productCrudService;
