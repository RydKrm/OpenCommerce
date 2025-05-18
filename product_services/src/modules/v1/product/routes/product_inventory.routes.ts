import { asyncHandler } from "@/middleware";
import express, { Request, Response } from "express";
import { CreateCommentDto } from "../../comment/dto/comment_crud.dto";
import { createComment } from "../../comment/services/comment_crud.service";
import sendResponse from "@/lib/response/send_response";
import {
  GetAllInventory,
  GetInventoryByProduct,
  GetSingleInventory,
} from "../service/product_inventory.service";

const router = express.Router();

router.post(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    const data = CreateCommentDto.parse(req.body);
    const result = await createComment(data);
    return sendResponse(res, result);
  })
);

router.get(
  "/single/:productId",
  asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const result = await GetSingleInventory(productId);
    return sendResponse(res, result);
  })
);

router.get(
  "/list-by-product",
  asyncHandler(async (req: Request, res: Response) => {
    const productId = req.query.productId as string;
    const result = await GetInventoryByProduct(productId, req.query);
    return sendResponse(res, result);
  })
);

router.get(
  "/list",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await GetAllInventory(req.query);
    return sendResponse(res, result);
  })
);

router.delete(
  "/delete/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await GetAllInventory(req.query);
    return sendResponse(res, result);
  })
);

export default router;
