import { asyncHandler } from "@/middleware";
import IRequest from "@/types/IRequest";
import { Response } from "express";
import { CreateOrderDto } from "../dto/order_crud.dto";
import { createOrder, createOrderItem } from "../service/order_crud.service";
import { productInventoryCheck } from "../broker/check_order.rpc";
import { negativeResponse, positiveResponse } from "@/lib/response/response";
import { checkProductAvailability, updateProductInventory } from "../gRPC/controller/order_to_product.service";

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

export const createOrders = asyncHandler(
  async (req: IRequest, res: Response) => {
    const userId = req.user_id as string;
    const data = CreateOrderDto.parse({
      ...req.body,
      userId,
    });

    // // check product inventory
    // const isInventoryUpdated: boolean = await productInventoryCheck(
    //   data.orderItems,
    //   userId
    // );
    const productList = data.orderItems.map(item => ({
        id: item.productId,
        name: item.productName,
        quantity: item.quantity,
        price: item.price
    }));

    const checkInventory = await checkProductAvailability(productList);

    if(!checkInventory || checkInventory.length === 0){
        return negativeResponse(res, "product not found");
    }

    console.log("Product availability response:", checkInventory);

    // @ts-ignore
    const unavailableProducts = checkInventory.products.filter((product) => !product.is_available);
    if(unavailableProducts.length > 0){
      // @ts-ignore
        const unavailableNames = unavailableProducts.map(p => p.name).join(", ");
        return negativeResponse(res, `Some products are unavailable or insufficient quantity: ${unavailableNames}`);
    }
    
    // create Order
    const orderCreate = await createOrder(data);
    const createItem = await createOrderItem(data.orderItems, orderCreate.id);

    // update the inventory in product service
    const orderDetails = data.orderItems.map(item => ({
        id: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.productName
    }));

    const updateInventory = await updateProductInventory(orderDetails, userId);
    if (!updateInventory) {
      return negativeResponse(res, "Failed to update product inventory");
    }

    return positiveResponse(res, "Order Created Successfully");
  }
);

export default createOrders;
