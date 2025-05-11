import express from "express";
import category_crud_router from "./router/category_crud.routes";
const category_router = express.Router();

category_router.use("/profile", category_crud_router);

export default category_router;
