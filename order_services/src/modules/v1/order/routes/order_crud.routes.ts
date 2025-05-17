import express from "express";
import validator from "@/utils/validator";
import orderCrudController from "../controller/order_crud.controller";

const router = express.Router();

router.post("create", orderCrudController.createOrder);
router.get("single/:orderId", orderCrudController.getSingleOrder);
router.get("all", orderCrudController.getAllOrders);
router.put("update/:orderId", orderCrudController.updateOrderStatus);
router.delete("delete/:orderId", orderCrudController.deleteOrder);

export default router;
