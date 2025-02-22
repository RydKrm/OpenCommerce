import express from "express";
import categoryCrudController from "../controller/category_crud.controller";
import validator from "@/utils/validator";
import categoryDto from "../dto/category.dto";
import auth from "@/auth/authenticate";
import { ROLES } from "@/types/role";
const category_crud_router = express.Router();

category_crud_router.post(
  "/create",
  // auth([ROLES.ADMIN]),
  validator(categoryDto.create),
  categoryCrudController.create
);

category_crud_router.get("/all", categoryCrudController.getAllCategory);

category_crud_router.get(
  "/single/:id",
  categoryCrudController.getSingleCategory
);

category_crud_router.put(
  "/update/:id",
  // auth([ROLES.ADMIN]),
  validator(categoryDto.updateCategory),
  categoryCrudController.updateCategory
);

category_crud_router.delete(
  "/delete/:id",
  // auth([ROLES.ADMIN]),
  categoryCrudController.deleteCategory
);

export default category_crud_router;
