import { Request, Response } from "express";
import productCrudService from "../service/product_crud.service";
import IRequest from "@/types/IRequest";
import { CreateProductDto } from "../dto/product.crud.dto";
import { asyncHandler } from "@/middleware";
import sendResponse from "@/lib/response/send_response";

class ProductCrudController {
  create = asyncHandler(async (req: IRequest, res: Response) => {
    console.log("Request body ", req.body);
    console.log("Request variants ", JSON.parse(req.body.variants[0]));
    const data = CreateProductDto.parse(req.body);
    const result = await productCrudService.createProduct(data);
    return sendResponse(res, result);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const updateProduct = await productCrudService.updateProduct(
      productId,
      req.body
    );
    return sendResponse(res, updateProduct);
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const updatedProduct = await productCrudService.updateProductStatus(
      productId
    );
    return sendResponse(res, updatedProduct);
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query;
    const products = await productCrudService.getAllProducts(query);
    return sendResponse(res, products);
  });

  details = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const product = await productCrudService.getProductById(productId);
    return sendResponse(res, product);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const deletedProduct = await productCrudService.deleteProduct(productId);
    return sendResponse(res, deletedProduct);
  });
}

const productCrudController = new ProductCrudController();

export default productCrudController;
