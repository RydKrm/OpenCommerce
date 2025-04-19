import prisma from "@/database/prisma";
import { IOrder, IOrderItem } from "../interface/order.interface";
import crudLibrary from "@/lib/crud/crud.lib";
import { Request } from "express";
import { OrderStatus } from "@prisma/client";

class OrderCrudService {
  // Create a new order
  createOrder = async (data: IOrder) => {
    const newOrder = await prisma.orders.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        addressId: data.addressId,
        status: (data?.status as OrderStatus) || OrderStatus.PENDING,
      },
    });
    return newOrder;
  };

  // Create multiple order items for a specific order
  createOrderItem = async (data: IOrderItem[], orderId: number) => {
    const orderItemList: IOrderItem[] = data.map((item) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const newOrderItems = await prisma.orderItem.createMany({
      data: orderItemList,
    });

    return newOrderItems;
  };

  // Get a single order by ID, including related items
  getSingleOrder = async (orderId: number) => {
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
  getAllOrderOfUser = async (userId: number) => {
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

  // Update an order by ID
  updateOrder = async (orderId: number, data: Partial<IOrder>) => {
    const updatedOrder = await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        totalAmount: data.totalAmount,
        addressId: data.addressId,
        status: (data?.status as OrderStatus) || OrderStatus.PENDING,
      },
    });

    return updatedOrder;
  };

  // update order status
  updateOrderStatus = async (orderId: number, status: OrderStatus) => {
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
  deleteOrder = async (orderId: number) => {
    const deletedOrder = await prisma.orders.delete({
      where: {
        id: orderId,
      },
    });

    return deletedOrder;
  };

  // Delete all order items for a specific order
  deleteOrderItems = async (orderId: number) => {
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
