import express from "express";
import categoryCrudController from "../controller/category_crud.controller";
import validator from "@/utils/validator";
import categoryDto from "../dto/category.dto";

const category_crud_router = express.Router();

category_crud_router.post(
  "/create",
  validator(categoryDto.create),
  categoryCrudController.create
);

category_crud_router.get("/all", categoryCrudController.getAllCategory);

category_crud_router.get(
  "/single:id",
  categoryCrudController.getSingleCategory
);

category_crud_router.put(
  "/update/:id",
  validator(categoryDto.updateCategory),
  categoryCrudController.updateCategory
);

category_crud_router.delete(
  "/delete/:id",
  categoryCrudController.deleteCategory
);

export default category_crud_router;
