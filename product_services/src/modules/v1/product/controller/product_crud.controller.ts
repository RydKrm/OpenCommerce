import { Request, Response } from "express";
import productCrudService from "../service/product_crud.service";
import IRequest from "@/types/IRequest";
import { CreateProductDto } from "../dto/product.crud.dto";
import { asyncHandler } from "@/middleware";
import sendResponse from "@/lib/response/send_response";

class ProductCrudController {
  create = asyncHandler(async (req: IRequest, res: Response) => {
    // console.log("Request body ", req.body);
    // console.log("Request variants ", JSON.parse(req.body.variants[0]));
    // console.log("Request body data ", req.body);
    const {
      name,
      categoryId,
      price,
      description,
      quantity,
      properties,
      previousPrice,
      variants,
      ...variantsImage
    } = req.body;
    const data = CreateProductDto.parse(req.body);

    const variantImageList: { id: string; image_url: string }[] = [];

    for (const key in variantsImage) {
      variantImageList.push({ id: key, image_url: variantsImage[key][0] });
    }

    const variantsList = await productCrudService.addedImagesInVariant(
      JSON.parse(variants),
      variantImageList
    );

    const result = await productCrudService.createProduct({
      ...data,
      variants: variantsList,
    });
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

  findBySlug = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.slug;
    const product = await productCrudService.getProductBySlug(productId);
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
