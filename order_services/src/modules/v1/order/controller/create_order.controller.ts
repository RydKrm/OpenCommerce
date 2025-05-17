import { asyncHandler } from "@/middleware";
import IRequest from "@/types/IRequest";
import { Response } from "express";
import { CreateOrderDto } from "../dto/order_crud.dto";
import orderCrudService from "../service/order_crud.service";
import { productInventoryCheck } from "../broker/check_order.rpc";
import { negativeResponse, positiveResponse } from "@/lib/response/response";

/**
 * @body - Order + Order Item
 * @auth - userId
 * @Logic
 * - with product_id, price, quantity, send request to product services
 * - product service first verify it that product exists or not, also check quantity and price
 * - update product inventory with price, product_id, user_id, and quantity
 * - reduce total product quantity from product table
 * - then product service request back to order services
 * - After get verify order services make payment then create order and order item
 */

export const createOrder = asyncHandler(
  async (req: IRequest, res: Response) => {
    const userId = req.user_id;
    const data = CreateOrderDto.parse({
      ...req.body,
      userId,
    });

    // check product inventory
    const isInventoryUpdated: boolean = await productInventoryCheck(
      data.orderItems
    );
    if (!isInventoryUpdated) {
      return negativeResponse(res, "Inventory Not Updated");
    }
    // create Order
    const orderCreate = await orderCrudService.createOrder(data);
    const createItem = orderCrudService.createOrderItem(
      data.orderItems,
      orderCreate.id
    );
    return positiveResponse(res, "Order Created Successfully");
  }
);
