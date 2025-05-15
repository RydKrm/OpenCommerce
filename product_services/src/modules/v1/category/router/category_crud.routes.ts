import express from "express";
import categoryCrudController from "../controller/category_crud.controller";
const category_crud_router = express.Router();

category_crud_router.post(
  "/create",
  // auth([ROLES.ADMIN]),
  categoryCrudController.create
);

category_crud_router.get("/all", categoryCrudController.getAllCategory);

category_crud_router.get(
  "/single/:id",
  categoryCrudController.getSingleCategory
);

category_crud_router.put("/update/:id", categoryCrudController.updateCategory);

category_crud_router.delete(
  "/delete/:id",
  categoryCrudController.deleteCategory
);

export default category_crud_router;
