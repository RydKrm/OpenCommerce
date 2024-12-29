import auth from "@/auth/authenticate";
import crudLibrary from "@/lib/crud/crud.lib";
import { ROLES } from "@/types/role";
import express from "express";
import wishListDto from "../dto/wishlist.dto";
import validator from "@/utils/validator";
const wishListCrudRouter = express.Router();

wishListCrudRouter.post(
  "/create",
  auth([ROLES.USER]),
  validator(wishListDto.create),
  crudLibrary.create("wishList")
);

wishListCrudRouter.get(
  "/get-all-by-users",
  crudLibrary.getMany("wishList", {
    select: {
      id: true,
      userId: {
        select: {
          id: true,
          name: true,
        },
      },
      productId: {
        select: {
          id: true,
          name: true,
          vendorId: {
            select: {
              id: true,
              name: true,
            },
          },
          price: true,
          image: true,
        },
      },
    },
  })
);

wishListCrudRouter.get(
  "/single/:id",
  auth([ROLES.USER]),
  crudLibrary.getSingle("wishList", {
    select: {
      id: true,
      userId: {
        select: {
          id: true,
          name: true,
        },
      },
      productId: {
        select: {
          id: true,
          name: true,
          vendorId: {
            select: {
              id: true,
              name: true,
            },
          },
          price: true,
          image: true,
        },
      },
    },
  })
);

wishListCrudRouter.delete(
  "/delete/:id",
  auth([ROLES.USER]),
  crudLibrary.delete("wishList")
);

export default wishListCrudRouter;
