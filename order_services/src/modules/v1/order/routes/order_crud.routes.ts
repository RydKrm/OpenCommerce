import express, { Request, Response } from "express";
import { asyncHandler } from "@/middleware";
import {
  deleteOrder,
  getAllOrderOfUser,
  getSingleOrder,
  updateOrderStatus,
} from "../service/order_crud.service";
import IRequest from "@/types/IRequest";
import sendResponse from "@/lib/response/send_response";
import { createOrders } from "../controller/create_order.controller";

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Order service is up and running",
  });
});

router.post("/create", createOrders);
router.get(
  "/single/:orderId",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await getSingleOrder(req.params.orderId);
    return sendResponse(res, result);
  })
);
router.get(
  "/by-user",
  asyncHandler(async (req: IRequest, res: Response) => {
    const userId = req.user_id as string;
    console.log("checking product inventory");
    if (!userId) {
      return sendResponse(res, { statusCode: 400, message: "User not found" });
    }
    const result = await getAllOrderOfUser(userId);
    return sendResponse(res, result);
  })
);
router.put(
  "/update-status/:orderId",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await updateOrderStatus(req.params.orderId, req.body.status);
    return sendResponse(res, result);
  })
);
router.delete(
  "/delete/:orderId",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await deleteOrder(req.params.orderId);
    return sendResponse(res, result);
  })
);

export default router;
