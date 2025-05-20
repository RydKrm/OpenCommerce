import prisma from "@/database/prisma";
import { CreateAddressType, UpdateAddressType } from "../dto/address.dto";
import sendData from "@/lib/response/send_data";
import { IQuery } from "@/types/IQuery";

export const createAddress = async (data: CreateAddressType) => {
  const newAddress = await prisma.address.create({
    data,
  });
  return sendData(200, "Address created successfully", newAddress);
};

// Get Single address
export const getSingleAddress = async (id: string) => {
  const address = await prisma.address.findUnique({
    where: {
      id,
    },
  });
  if (!address) return sendData(400, "Address not found by id");
  return sendData(200, "Address retrieved successfully", address);
};

// Get all address
export const getAllAddress = async (userId: string, query: IQuery) => {
  const { skip = 0, limit = 10 } = query;
  const list = await prisma.address.findMany({
    where: {
      userId,
    },
    skip: Number(skip),
    take: Number(limit),
  });

  const total = await prisma.address.count({
    where: {
      userId,
    },
  });

  return sendData(200, "Address retrieved successfully", { list, total });
};

// Update address

export const updateAddress = async (
  addressId: string,
  data: UpdateAddressType
) => {
  try {
    const address = await prisma.address.update({
      where: {
        id: addressId,
      },
      data: data,
    });
    return sendData(200, "Address updated successfully", address);
  } catch (error) {
    return sendData(400, "Address not updated");
  }
};

// Delete address
export const deleteAddress = async (addressId: string) => {
  try {
    const address = await prisma.address.delete({
      where: {
        id: addressId,
      },
    });
    return sendData(200, "Address deleted successfully", address);
  } catch (error) {
    return sendData(400, "Address not deleted");
  }
};
