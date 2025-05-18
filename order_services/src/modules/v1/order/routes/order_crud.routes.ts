import express, { Request, Response } from "express";
import validator from "@/utils/validator";
// import orderCrudController from "../controller/order_crud.controller";
import { asyncHandler } from "@/middleware";
import {
  deleteOrder,
  getAllOrderOfUser,
  getSingleOrder,
  updateOrderStatus,
} from "../service/order_crud.service";
import IRequest from "@/types/IRequest";
import sendResponse from "@/lib/response/send_response";
import { createOrder } from "../controller/create_order.controller";

const router = express.Router();

router.post("create", createOrder);
router.get(
  "single/:orderId",
  asyncHandler(async (req: Request, res: Response) => {
    getSingleOrder(req.params.orderId);
  })
);
router.get(
  "by-user",
  asyncHandler(async (req: IRequest, res: Response) => {
    const userId = req.user_id as string;

    if (!userId) {
      return sendResponse(res, { statusCode: 400, message: "User not found" });
    }
    const result = await getAllOrderOfUser(userId);
    return sendResponse(res, result);
  })
);
router.put(
  "update-status/:orderId",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await updateOrderStatus(req.params.orderId, req.body);
    return sendResponse(res, result);
  })
);
router.delete(
  "delete/:orderId",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await deleteOrder(req.params.orderId);
    return sendResponse(res, result);
  })
);

export default router;
