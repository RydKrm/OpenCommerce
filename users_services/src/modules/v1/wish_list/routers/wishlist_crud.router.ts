import express from "express";
import controller from "../controller/basic.controller";
const router = express.Router();

router.post("/create", controller.create);

router.get("/list-by-user/:id", controller.getWishListByUser);

router.delete("/delete/:id", controller.deleteWishList);

export default router;
