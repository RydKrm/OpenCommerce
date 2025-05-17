import prisma from "@/database/prisma";
import { IOrder, IOrderItem } from "../interface/order.interface";
import crudLibrary from "@/lib/crud/crud.lib";
import { Request } from "express";
import { OrderStatus } from "@prisma/client";
import { CreateOrderType, OrderItemType } from "../dto/order_crud.dto";

class OrderCrudService {
  // Create a new order
  createOrder = async (data: CreateOrderType) => {
    const { orderItems, ...rest } = data;
    const newOrder = await prisma.orders.create({
      data: {
        ...rest,
      },
    });
    return newOrder;
  };

  // Create multiple order items for a specific order
  createOrderItem = async (data: OrderItemType[], orderId: string) => {
    const orderItemList = data.map((item) => ({
      orderId,
      ...item,
    }));

    const newOrderItems = await prisma.orderItem.createMany({
      data: orderItemList,
    });

    return newOrderItems;
  };

  // Get a single order by ID, including related items
  getSingleOrder = async (orderId: string) => {
    const order = await prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: true,
        Address: true, // Include related address
      },
    });

    return order;
  };

  // Get all orders for a specific user
  getAllOrderOfUser = async (userId: string) => {
    const orderList = await prisma.orders.findMany({
      where: {
        userId,
      },
      include: {
        OrderItem: true,
        Address: true, // Include related address
      },
    });
    return orderList;
  };

  // Get all orders for a user with pagination
  getAllOrderOrUserWithPagination = async (req: Request, userId: number) => {
    const list = await crudLibrary.getManyWithPagination("orders", {
      where: {
        userId,
      },
      include: {
        OrderItem: true,
        Address: true, // Include related address
      },
    });

    return list;
  };

  // update order status
  updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const updatedOrder = await prisma.orders.update({
        where: {
          id: orderId,
        },
        data: {
          status,
        },
      });

      return updatedOrder;
    } catch (error) {
      throw new Error("Order not found by id");
    }
  };

  // Delete an order by ID
  deleteOrder = async (orderId: string) => {
    const deletedOrder = await prisma.orders.delete({
      where: {
        id: orderId,
      },
    });

    return deletedOrder;
  };

  // Delete all order items for a specific order
  deleteOrderItems = async (orderId: string) => {
    const deletedItems = await prisma.orderItem.deleteMany({
      where: {
        orderId,
      },
    });

    return deletedItems;
  };
}

const orderCrudService = new OrderCrudService();
export default orderCrudService;
