// // create a crud controller

// import { Request, Response } from "express";
// import { negativeResponse, positiveResponse } from "@/lib/response/response";
// import IRequest from "@/types/IRequest";
// import OrderCRUDService from "../service/order_crud.service";
// import { ROLES } from "@/types/role";

// import { OrderStatus } from "@prisma/client";
// import { IOrder } from "../interface/order.interface";

// class OrderCRUDController {
//   // Add your methods and properties here
//   constructor() {
//     // Initialization code
//   }

//   async createOrder(req: IRequest, res: Response) {
//     try {
//       const { orderItems, ...data } = req.body;
//       const newOrder = await OrderCRUDService.createOrder(data);

//       // now push order item to item order table
//       const orderItem = await OrderCRUDService.createOrderItem(
//         orderItems,
//         newOrder.id
//       );

//       return positiveResponse(res, "Order created successfully");
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Error creating order";
//       return negativeResponse(res, errorMessage);
//     }
//   }

//   async getSingleOrder(req: IRequest, res: Response) {
//     try {
//       const orderId = Number(req.params.orderId);
//       const order = await OrderCRUDService.getSingleOrder(orderId);
//       return positiveResponse(res, "Order retrieved successfully", {
//         data: order,
//       });
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Error retrieving order";
//       return negativeResponse(res, errorMessage);
//     }
//   }

//   async getAllOrders(req: IRequest, res: Response) {
//     try {
//       const userId = Number(req.user_id);
//       const orderList = await OrderCRUDService.getAllOrderOfUser(userId);
//       return positiveResponse(res, "Order list retrieved successfully", {
//         data: orderList,
//       });
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Error retrieving order list";
//       return negativeResponse(res, errorMessage);
//     }
//   }

//   async updateOrderStatus(req: IRequest, res: Response) {
//     try {
//       const orderId = req.params.id;
//       const status = req.body.status as OrderStatus;
//       const updatedOrder = await OrderCRUDService.updateOrderStatus(
//         Number(orderId),
//         status
//       );
//       return positiveResponse(res, "Order status updated successfully", {
//         data: updatedOrder,
//       });
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Error updating order status";
//       return negativeResponse(res, errorMessage);
//     }
//   }

//   // Delete an order by ID
//   async deleteOrder(req: IRequest, res: Response) {
//     try {
//       const orderId = req.params.id;
//       const deletedOrder = await OrderCRUDService.deleteOrder(Number(orderId));
//       return positiveResponse(res, "Order deleted successfully", {
//         data: deletedOrder,
//       });
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Error deleting order";
//       return negativeResponse(res, errorMessage);
//     }
//   }
// }

// const orderCRUDController = new OrderCRUDController();

// export default orderCRUDController;
