import z from "zod";

class WishListDto {
  create = z.object({
    productId: z.number({ message: "Product id is required" }),
    userId: z.number({ message: "User id is required" }),
  });
}

const wishListDto = new WishListDto();

export default wishListDto;
