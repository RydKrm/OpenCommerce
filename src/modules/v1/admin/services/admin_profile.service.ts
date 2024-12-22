import prisma from "@/database/prisma";
import { IAdmin } from "../interface/admin.interface";
import bycrpt from "bcrypt";
import pagination from "@/lib/pagination/pagination";
import { Request } from "express";

export class AdminProfileService {
  register = async (data: IAdmin) => {
    const isAdminExists = await prisma.admin.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
          {
            phoneNumber: data.phoneNumber,
          },
        ],
      },
    });

    if (isAdminExists) {
      throw new Error("Admin already exists with this email or phone number");
    }

    data.password = bycrpt.hashSync(data.password, 10);

    const admin = await prisma.admin.create({
      data: {
        ...data,
      },
    });

    return admin;
  };

  // Login mothods
  login = async (email: string, password: string) => {
    const admin = await prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new Error("Admin not found");
    }

    if (bycrpt.compareSync(password, admin.password)) {
      return admin;
    } else {
      throw new Error("Password is incorrect");
    }
  };

  // update admin
  updateAdmin = async (id: number, data: IAdmin) => {
    if (data.email) {
      const isAdminExists = await prisma.admin.findFirst({
        where: {
          email: data.email,
        },
      });

      if (isAdminExists) {
        throw new Error("Admin already exists with email");
      }
    }

    if (data.phoneNumber) {
      const isAdminExists = await prisma.admin.findFirst({
        where: {
          phoneNumber: data.phoneNumber,
        },
      });

      if (isAdminExists) {
        throw new Error("Admin already exists with phone number");
      }
    }
    const admin = await prisma.admin.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  };

  // get single admin
  getSingle = async (id: number) => {
    const admin = await prisma.admin.findFirst({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  };

  // Get All Admin
  getAllAdmin = async (req: Request) => {
    const admins = await pagination<IAdmin, any>(
      req,
      prisma.admin,
      {},
      {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          status: true,
        },
      }
    );
    return admins;
  };

  // Delete Admin
  deleteAdmin = async (id: number) => {
    const isExists = await prisma.admin.findFirst({
      where: {
        id,
      },
    });

    if (!isExists) {
      throw new Error("Admin not found");
    }

    const admin = await prisma.admin.delete({
      where: {
        id,
      },
    });

    return admin;
  };

  // forgot password
  forgotPassword = async (email: string) => {
    const admin = await prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new Error("Admin not found");
    }

    // send email to reset password
  };

  // change password
  changePassword = async (
    id: number,
    oldPassword: string,
    newPassword: string
  ) => {
    const admin = await prisma.admin.findFirst({
      where: {
        id,
      },
    });

    if (!admin) {
      throw new Error("Admin not found");
    }

    if (bycrpt.compareSync(oldPassword, admin.password)) {
      const password = bycrpt.hashSync(newPassword, 10);

      const updatedAdmin = await prisma.admin.update({
        where: {
          id,
        },
        data: {
          password,
        },
      });

      return updatedAdmin;
    } else {
      throw new Error("Password is incorrect");
    }
  };
}

const adminProfileService = new AdminProfileService();
export default adminProfileService;
