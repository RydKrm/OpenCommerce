import prisma from "@/database/prisma";
import { ISeller } from "../interface/seller.interface";
import bycrpt from "bcrypt";

export class SellerProfileService {
  register = async (data: ISeller) => {
    const isSellerExists = await prisma.seller.findFirst({
      where: {
        email: data.email,
      },
    });

    if (isSellerExists) {
      throw new Error("Seller already exists");
    }

    data.password = bycrpt.hashSync(data.password, 10);

    const Seller = await prisma.seller.create({
      data: {
        ...data,
      },
    });

    return Seller;
  };

  // Login mothods
  login = async (email: string, password: string) => {
    const Seller = await prisma.seller.findFirst({
      where: {
        email,
      },
    });

    if (!Seller) {
      throw new Error("Seller not found");
    }

    if (bycrpt.compareSync(password, Seller.password)) {
      return Seller;
    } else {
      throw new Error("Password is incorrect");
    }
  };

  // update Seller
  updateSeller = async (id: number, data: ISeller) => {
    if (data.email) {
      const isSellerExists = await prisma.seller.findFirst({
        where: {
          email: data.email,
        },
      });

      if (isSellerExists) {
        throw new Error("Seller already exists");
      }
    }

    const Seller = await prisma.seller.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    if (!Seller) {
      throw new Error("Seller not found");
    }

    return Seller;
  };

  // get single Seller
  getSingle = async (id: number) => {
    const Seller = await prisma.seller.findFirst({
      where: {
        id,
      },
    });

    if (!Seller) {
      throw new Error("Seller not found");
    }

    return Seller;
  };

  // Get All Seller
  getAllSeller = async () => {
    const Sellers = (await prisma.seller.findMany()) || [];
    return Sellers;
  };

  // Delete Seller
  deleteSeller = async (id: number) => {
    const Seller = await prisma.seller.delete({
      where: {
        id,
      },
    });

    if (!Seller) {
      throw new Error("Seller not found");
    }

    return Seller;
  };

  // forgot password
  forgotPassword = async (email: string) => {
    const Seller = await prisma.seller.findFirst({
      where: {
        email,
      },
    });

    if (!Seller) {
      throw new Error("Seller not found");
    }

    // send email to reset password
  };

  // change password
  changePassword = async (
    id: number,
    oldPassword: string,
    newPassword: string
  ) => {
    const Seller = await prisma.seller.findFirst({
      where: {
        id,
      },
    });

    if (!Seller) {
      throw new Error("Seller not found");
    }

    if (bycrpt.compareSync(oldPassword, Seller.password)) {
      const password = bycrpt.hashSync(newPassword, 10);

      const updatedSeller = await prisma.seller.update({
        where: {
          id,
        },
        data: {
          password,
        },
      });

      return updatedSeller;
    } else {
      throw new Error("Password is incorrect");
    }
  };
}

const sellerProfileService = new SellerProfileService();
export default sellerProfileService;
