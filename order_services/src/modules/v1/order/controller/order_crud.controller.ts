import { Request, Response } from "express";
import orderCrudService from "../service/order_crud.service";
import { negativeResponse, positiveResponse } from "@/lib/response/response";
import { OrderStatus } from "@prisma/client";

class OrderCrudController {
  async create(req: Request, res: Response) {
    try {
      const order = await orderCrudService.createOrder(req.body);
      return positiveResponse(res, "Order created successfully", {
        data: order,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllOrder(req: Request, res: Response) {
    try {
      const userId = Number(req.headers.userid);
      const orders = await orderCrudService.getAllOrderOfUser(userId);
      return positiveResponse(res, "Orders retrieved successfully", {
        data: orders,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async singleOrder(req: Request, res: Response) {
    try {
      const order = await orderCrudService.getSingleOrder(
        Number(req.params.orderId)
      );
      return positiveResponse(res, "Order retrieved successfully", {
        data: order,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllOrderByUserId(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const orders = await orderCrudService.getOrdersByUserId(userId);
      return positiveResponse(res, "Orders retrieved successfully", {
        data: orders,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async getAllOrderByProductId(req: Request, res: Response) {
    try {
      const productId = Number(req.params.productId);
      const orders = await orderCrudService.getOrdersByProductId(productId);
      return positiveResponse(res, "Orders retrieved successfully", {
        data: orders,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedOrder = await orderCrudService.updateOrder(
        Number(req.params.orderId),
        req.body
      );
      return positiveResponse(res, "Order updated successfully", {
        data: updatedOrder,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }

  async updateStatus(req: Request, res: Response) {
    const orderId = Number(req.params.orderId);
    const status: OrderStatus = req.body?.status;
    const updatedOrder = await orderCrudService.updateStatus(orderId, status);
    return positiveResponse(res, "Order status updated successfully", {
      data: updatedOrder,
    });
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const orderId = Number(req.params.orderId);
      await orderCrudService.deleteOrder(orderId);
      return positiveResponse(res, "Order deleted successfully");
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  }
}

const orderCrudController = new OrderCrudController();

export default orderCrudController;
