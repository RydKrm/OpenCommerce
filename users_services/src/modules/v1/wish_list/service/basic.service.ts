import IResponse from "@/types/IResponse";
import { IWishlist } from "../interface/wish_list.dto";
import prisma from "@/database/prisma";
import sendData from "@/lib/response/send_data";

export class wishlistService {
  create = async (data: IWishlist): Promise<IResponse> => {
    const isExists = await prisma.wishlist.findFirst({
      where: {
        user_id: data.user_id,
        product_id: data.product_id,
      },
    });

    if (isExists) {
      return sendData(400, "WishList already exists");
    }

    const newWishList = await prisma.wishlist.create({
      data,
    });
    return sendData(200, "WishList created successfully", newWishList);
  };

  // get all wishlist
  getAllWishList = async (
    limit: number = 10,
    skip: number = 0
  ): Promise<IResponse> => {
    const wishLists = await prisma.wishlist.findMany({
      skip: skip,
      take: limit,
    });

    const totalCount = await prisma.wishlist.count({});

    return sendData(200, "WishList retrieved successfully", {
      wishLists,
      totalCount,
    });
  };

  // get all by user id

  getWishListByUserId = async (
    user_id: string,
    limit: number = 10,
    skip: number = 0
  ): Promise<IResponse> => {
    const wishLists = await prisma.wishlist.findMany({
      where: {
        user_id,
      },
      skip: skip,
      take: limit,
    });

    const totalCount = await prisma.wishlist.count({
      where: {
        user_id,
      },
    });

    return sendData(200, "WishList retrieved successfully", {
      wishLists,
      totalCount,
    });
  };
}

export default new wishlistService();
