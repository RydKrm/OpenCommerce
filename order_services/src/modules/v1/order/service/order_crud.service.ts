import prisma from "@/database/prisma";
import { IOrder, IOrderItem } from "../interface/order.interface";
import crudLibrary from "@/lib/crud/crud.lib";
import { Request } from "express";
import { OrderStatus } from "@prisma/client";

class OrderCrudService {
  createOrder = async (data: IOrder) => {
    const newOrder = await prisma.orders.create({
      data: {
        userId: data.userId,
        totalAmount: data.totalAmount,
        addressId: data.addressId,
      },
    });
  };

  createOrderItem = async (data: IOrderItem[], orderId: number) => {
    const orderItemList: IOrderItem[] = [];
    data.forEach((item) => {
      orderItemList.push({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    });

    const newOrderItem = await prisma.orderItem.createMany({
      data: orderItemList,
    });

    return true;
  };

  getSingleOrder = async (orderId: number) => {
    const order = await prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: true,
      },
    });

    return this.getSingleOrder;
  };

  getAllOrderOfUser = async (userId: number) => {
    const orderList = await prisma.orders.findMany({
      where: {
        userId,
      },
      include: {
        OrderItem: true,
      },
    });
    return orderList;
  };

  getAllOrderOrUserWithPagination = async (req: Request, userId: number) => {
    const list = crudLibrary.getManyWithPagination("orders", {
      include: {
        OrderItem: true,
      },
    });

    return list;
  };

  getOrdersByProductId = async (productId: number) => {
    const orderList = await prisma.orderItem.findMany({
      where: {
        productId: productId,
      },
      include: {
        Orders: true,
      },
    });
    return orderList;
  };

  getOrdersByUserId = async (userId: number) => {
    const orderList = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
      include: {
        OrderItem: true,
      },
    });
    return orderList;
  };

  updateStatus = async (orderId: number, status: OrderStatus) => {
    const updatedOrder = await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    });

    return updatedOrder;
  };

  updateOrder = async (orderId: number, orderData: any) => {
    await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: orderData,
    });
  };

  deleteOrder = async (orderId: number) => {};
}

const orderCrudService = new OrderCrudService();
export default orderCrudService;
