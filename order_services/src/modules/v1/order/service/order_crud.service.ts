import prisma from "@/database/prisma";
import { IOrder, IOrderItem } from "../interface/order.interface";
import crudLibrary from "@/lib/crud/crud.lib";
import { Request } from "express";

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

  getsingleOrder = async (orderId: number) => {
    const order = await prisma.orders.findFirst({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: true,
      },
    });

    return this.getsingleOrder;
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

  updateOrder = async (orderId: number, data: IOrder) => {};
}

const orderCrudService = new OrderCrudService();
export default orderCrudService;
