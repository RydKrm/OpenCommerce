import sendData from "@/lib/response/send_data";
import { CreateInventoryDto } from "../dto/product_inventory.dto";
import prisma from "@/database/prisma";
import { IQuery } from "@/types/IQuery";

export const CreateInventory = async (data: CreateInventoryDto) => {
  const product = await prisma.product.findUnique({
    where: {
      id: data.productId,
    },
  });
  if (product) {
    await prisma.product.update({
      where: {
        id: data.productId,
      },
      data: {
        quantity: product.quantity + data.quantity,
      },
    });
  }

  const isCreated = await prisma.product_inventory.create({
    data: {
      ...data,
      type: "incoming",
    },
  });

  if (isCreated) {
    return sendData(200, "Inventory created successfully", isCreated);
  }
  return sendData(400, "Inventory not created");
};

export const UpdateInventory = async (id: string, data: CreateInventoryDto) => {
  const isUpdated = await prisma.product_inventory.update({
    where: {
      id,
    },
    data,
  });
  if (isUpdated) {
    return sendData(200, "Inventory updated successfully", isUpdated);
  }
  return sendData(400, "Inventory not updated");
};

export const DeleteInventory = async (id: string) => {
  const isDeleted = await prisma.product_inventory.delete({
    where: {
      id,
    },
  });
  if (isDeleted) {
    return sendData(200, "Inventory deleted successfully", isDeleted);
  }
  return sendData(400, "Inventory not deleted");
};

export const GetSingleInventory = async (id: string) => {
  const inventory = await prisma.product_inventory.findUnique({
    where: {
      id,
    },
  });
  if (inventory) {
    return sendData(200, "Inventory retrieved successfully", inventory);
  }
  return sendData(400, "Inventory not found by id");
};

export const GetAllInventory = async (query: IQuery) => {
  const { skip = 0, limit = 10 } = query;
  const inventory = await prisma.product_inventory.findMany({
    skip: Number(skip),
    take: Number(limit),
  });
  if (inventory) {
    return sendData(200, "Inventory retrieved successfully", inventory);
  }
  return sendData(400, "Inventory not found by id");
};

export const GetInventoryByProduct = async (
  productId: string,
  query: IQuery
) => {
  const inventory = await prisma.product_inventory.findMany({
    where: {
      productId,
    },
    skip: Number(query.skip),
    take: Number(query.limit),
  });
  if (inventory) {
    return sendData(200, "Inventory retrieved successfully", inventory);
  }
  return sendData(400, "Inventory not found by id");
};
