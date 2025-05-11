// import prisma from "@/database/prisma";
// import { CreateProductType, UpdateProductType } from "../dto/product.crud.dto";
// import sendData from "@/lib/response/send_data";

// interface ICreateProductType extends CreateProductType {
//   image: string[];
// }

// class ProductCrudService {
//   async createProduct(product: ICreateProductType) {
//     const { categoryId, ...rest } = product;
//     const newProduct = await prisma.product.create({
//       data: { ...rest, Category: { connect: { id: categoryId } } },
//     });
//     return sendData(200, "Product created successfully", newProduct);
//   }

//   async updateProduct(id: number, updatedProduct: UpdateProductType) {
//     const updateProduct = await prisma.product.update({
//       where: { id },
//       data: updatedProduct,
//     });

//     return sendData(200, "Product updated successfully", updateProduct);
//   }

//   async updateProductStatus(productId: string) {
//     const isExists = await prisma.product.findFirst({
//       where: { id: productId },
//     });

//     if (!isExists) {
//       throw new Error("Product not found by id");
//     }

//     const updatedProduct = await prisma.product.update({
//       where: { id: productId },
//       data: { status: !isExists.status },
//     });
//     return sendData(200, "Product status updated successfully", updatedProduct);
//   }

//   async deleteProduct(id: number) {
//     const isExist = await prisma.product.findFirst({
//       where: { id },
//     });
//     if (!isExist) {
//       throw new Error("Product not found by id");
//     }

//     await prisma.product.delete({
//       where: { id },
//     });

//     return sendData(200, "Product deleted successfully");
//   }

//   async getAllProducts() {
//     const products = await prisma.product.findMany({});
//     return products;
//   }

//   async getProductById(id: number) {
//     const product = await prisma.product.findUnique({
//       where: { id },
//     });
//     if (!product) {
//       throw new Error("Product not found by id");
//     }
//     return product;
//   }

//   // Search product by name
//   async searchProductByName(name: string) {
//     const products = await prisma.product.findMany({
//       where: {
//         name: { contains: name },
//       },
//     });
//     return products;
//   }

//   async findAllProductByCategory(category: number) {
//     const products = await prisma.product.findMany({
//       where: {
//         categoryId: category,
//       },
//     });
//     return products;
//   }
// }

// const productCrudService = new ProductCrudService();

// export default productCrudService;
