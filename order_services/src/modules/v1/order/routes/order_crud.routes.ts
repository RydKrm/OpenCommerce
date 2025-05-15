// Create a route for crud controller

import express from "express";
import auth from "@/auth/authenticate";
import { ROLES } from "@/types/role";
import validator from "@/utils/validator";
import orderCrudDto from "../dto/order_crud.dto";
import orderCrudController from "../controller/order_crud.controller";
import { OrderStatus } from "@prisma/client";
import { IOrder } from "../interface/order.interface";
import { positiveResponse, negativeResponse } from "@/lib/response/response";
import IRequest from "@/types/IRequest";

const router = express.Router();

router.post("create", auth([ROLES.USER]), orderCrudController.createOrder);
router.get(
  "single/:orderId",
  auth([ROLES.USER]),
  orderCrudController.getSingleOrder
);
router.get("all", auth([ROLES.USER]), orderCrudController.getAllOrders);
router.put(
  "update/:orderId",
  auth([ROLES.USER]),
  validator(orderCrudDto.update),
  orderCrudController.updateOrderStatus
);
router.delete(
  "delete/:orderId",
  auth([ROLES.USER]),
  orderCrudController.deleteOrder
);

export default router;
