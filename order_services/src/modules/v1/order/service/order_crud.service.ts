import prisma from "@/database/prisma";
import { OrderStatus } from "@prisma/client";
import { CreateOrderType, OrderItemType } from "../dto/order_crud.dto";
import sendData from "@/lib/response/send_data";

// Create a new order
export const createOrder = async (data: CreateOrderType) => {
  const { orderItems, ...rest } = data;
  const newOrder = await prisma.orders.create({
    data: {
      ...rest,
    },
  });
  return newOrder;
};

// Create multiple order items for a specific order
export const createOrderItem = async (
  data: OrderItemType[],
  orderId: string
) => {
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
export const getSingleOrder = async (orderId: string) => {
  const order = await prisma.orders.findFirst({
    where: {
      id: orderId,
    },
    include: {
      OrderItem: true,
      Address: true,
    },
  });

  if (!order) {
    return sendData(400, "Order not found by id");
  }

  return sendData(200, "Order fetched successfully", order);
};

// Get all orders for a specific user
export const getAllOrderOfUser = async (userId: string) => {
  const orderList = await prisma.orders.findMany({
    where: {
      userId,
    },
    include: {
      OrderItem: true,
      Address: true,
    },
  });
  return sendData(200, "Order fetched successfully", orderList);
};

// update order status
export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  try {
    const updatedOrder = await prisma.orders.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return sendData(200, "Order status updated successfully", updatedOrder);
  } catch (error) {
    return sendData(400, "Error updating order status");
  }
};

// Delete an order by ID
export const deleteOrder = async (orderId: string) => {
  const deletedOrder = await prisma.orders.delete({
    where: {
      id: orderId,
    },
  });
  if (deletedOrder) {
    return sendData(404, "Order not found");
  }

  await prisma.orderItem.deleteMany({
    where: {
      orderId: orderId,
    },
  });
  return sendData(200, "Order deleted successfully");
};
