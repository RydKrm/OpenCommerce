import { Request, Response } from "express";
import imageService from "../../image/image.service";
import { negativeResponse, positiveResponse } from "@/lib/response/response";
import productCrudService from "../service/product_crud.service";
import IRequest from "@/types/IRequest";

class ProductCrudController {
  async create(req: IRequest, res: Response) {
    try {
      const files = (req.files as Express.Multer.File[]) || [];
      //   check if the file exists
      //   if (files && files.length === 0) {
      //     return negativeResponse(res, "File not found");
      //   }
      const vendorId = req.user_id;
      const product = req.body;
      const image: string[] = [];
      files.forEach(async (file) => {
        const imageUrl = await imageService.uploadImage(file);
        image.push(imageUrl.sourceUrl);
      });
      product.image = image;

      const newProduct = await productCrudService.createProduct({
        ...product,
        vendorId,
      });
      return positiveResponse(res, "Product created successfully", {
        data: newProduct,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.productId);
      const updateProduct = await productCrudService.updateProduct(
        productId,
        req.body
      );
      return positiveResponse(res, "Product updated successfully", {
        data: updateProduct,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async updateStatus(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);
    const updatedProduct = await productCrudService.updateProductStatus(
      productId
    );
    return positiveResponse(res, "Product status updated successfully", {
      data: updatedProduct,
    });
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await productCrudService.getAllProducts();
      return positiveResponse(res, "Products retrieved successfully", {
        data: products,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async getSingle(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.productId);
      const product = await productCrudService.getProductById(productId);
      return positiveResponse(res, "Product retrieved successfully", {
        data: product,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async search(req: Request, res: Response) {
    try {
      const keyword = req.query.name as string;
      const products = await productCrudService.searchProductByName(keyword);
      return positiveResponse(res, "Products retrieved successfully", {
        data: products,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async getProductByCategory(req: Request, res: Response) {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const products = await productCrudService.findAllProductByCategory(
        categoryId
      );
      return positiveResponse(res, "Products retrieved successfully", {
        data: products,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async getProductByVendor(req: Request, res: Response) {
    try {
      const vendorId = parseInt(req.params.vendorId);
      const products = await productCrudService.findAllProductByVendor(
        vendorId
      );
      return positiveResponse(res, "Products retrieved successfully", {
        data: products,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.productId);
      await productCrudService.deleteProduct(productId);
      return positiveResponse(res, "Product deleted successfully");
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }
}

const productCrudController = new ProductCrudController();

export default productCrudController;
