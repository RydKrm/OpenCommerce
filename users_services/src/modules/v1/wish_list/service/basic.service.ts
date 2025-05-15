import IResponse from "@/types/IResponse";
import prisma from "@/database/prisma";
import sendData from "@/lib/response/send_data";
import { CreateWishlistDtoType } from "../dto/wishlist.dto";
import { getProductListRPC } from "../broker/get_list";

export class wishlistService {
  create = async (data: CreateWishlistDtoType): Promise<IResponse> => {
    const isExists = await prisma.wishlist.findFirst({
      where: {
        product_id: data.productId,
        user_id: data.userId,
      },
    });

    if (isExists) {
      return sendData(400, "WishList already exists");
    }

    const newWishList = await prisma.wishlist.create({
      data: {
        product_id: data.productId,
        user_id: data.userId,
      },
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

    const productIds = wishLists.map((item) => item.product_id);

    const product_list = await getProductListRPC(productIds);

    const totalCount = await prisma.wishlist.count({
      where: {
        user_id,
      },
    });

    return sendData(200, "WishList retrieved successfully", {
      product_list,
      totalCount,
    });
  };

  deleteWishList = async (id: string): Promise<IResponse> => {
    const wishList = await prisma.wishlist.delete({
      where: {
        id,
      },
    });
    return sendData(200, "WishList deleted successfully", wishList);
  };
}

export default new wishlistService();
