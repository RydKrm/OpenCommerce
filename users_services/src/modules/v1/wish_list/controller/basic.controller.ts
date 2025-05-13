import { asyncHandler } from "@/middleware";
import { Request, Response } from "express";
import { CreateWishlistDto } from "../dto/wishlist.dto";
import wishlistService from "../service/basic.service";
import sendResponse from "@/lib/response/send_response";
import IRequest from "@/types/IRequest";

export class BasicWishListController {
  create = asyncHandler(async (req: IRequest, res: Response) => {
    const user_id = req.user_id;

    const data = CreateWishlistDto.parse(req.body);
    const result = await wishlistService.create(data);
    return sendResponse(res, result);
  });

  getAllWishList = asyncHandler(async (req: Request, res: Response) => {
    const limit = Number(req?.query?.limit) || 10;
    const skip = Number(req?.query?.skip) || 0;
    return sendResponse(res, await wishlistService.getAllWishList(limit, skip));
  });

  getWishListByUser = asyncHandler(async (req: Request, res: Response) => {
    return sendResponse(
      res,
      await wishlistService.getWishListByUserId(req.params.id)
    );
  });

  deleteWishList = asyncHandler(async (req: Request, res: Response) => {
    return sendResponse(
      res,
      await wishlistService.deleteWishList(req.params.id)
    );
  });
}

const basicWishListController = new BasicWishListController();
export default basicWishListController;
