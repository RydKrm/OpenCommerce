// write me service for address crud
import prisma from "@/database/prisma";
import { IAddress } from "../interface/address.interface";
import crudLibrary from "@/lib/crud/crud.lib";
import { Request } from "express";
import { ROLES } from "@/types/role";
import IRequest from "@/types/IRequest";

class AddressCRUDService {
  createAddress = async (data: IAddress) => {
    const newAddress = await prisma.address.create({
      data: {
        userId: data.userId,
        addressLine1: data?.addressLine1,
        addressLine2: data?.addressLine2,
        city: data?.city,
        state: data?.state,
        country: data?.country,
        postalCode: data?.postalCode,
      },
    });
    return newAddress;
  };

  // Get Single address
  getSingleAddress = async (id: string) => {
    const address = await prisma.address.findUnique({
      where: {
        id: Number(id),
      },
    });
    return address;
  };

  // Get all address
  getAllAddress = async (req: Request) => {
    const { skip = 0, limit = 10 } = req.query;
    const { userId } = req.params;
    const list = await prisma.address.findMany({
      where: {
        userId: Number(userId),
      },
      skip: Number(skip),
      take: Number(limit),
    });

    const total = await prisma.address.count({
      where: {
        userId: Number(userId),
      },
    });

    return { total, list };
  };

  // Update address

  updateAddress = async (req: IRequest) => {
    const { id } = req.params;
    const { userId, ...data } = req.body;
    const address = await prisma.address.update({
      where: {
        id: Number(id),
      },
      data: {
        ...data,
      },
    });
    return address;
  };

  // Delete address
  deleteAddress = async (req: IRequest) => {
    try {
      const { id } = req.params;
      const address = await prisma.address.delete({
        where: {
          id: Number(id),
        },
      });
      return address;
    } catch (error) {
      throw new Error("Address not found by id");
    }
  };
  // Get address by userId
}

export default new AddressCRUDService();
