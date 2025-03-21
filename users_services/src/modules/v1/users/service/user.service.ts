import bycrpt from "bcrypt";
import { Request } from "express";
import prisma from "../../../../database/prisma";
import { IUser, IUserLogin } from "../interface/user.interface";

export class UserService {
  login = async (data: IUserLogin): Promise<IUser> => {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new Error("User not found by id");
    }
    return user;
  };

  register = async (data: IUser) => {
    const isUserExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (isUserExists) {
      throw new Error("User already exists by email");
    }

    // hash password
    const salt = bycrpt.genSaltSync(10);
    const hash = bycrpt.hashSync(data.password, salt);

    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hash,
      },
    });

    return { ...newUser, password: null };
  };

  getSingle = async (id: number) => {
    const singleUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!singleUser) {
      throw new Error("User not found by id");
    }

    return { ...singleUser, password: null };
  };

  getAllUser = async (req: Request) => {
    const { limit = 10, skip = 0, search } = req.params;
    const where = {};
    if (search) {
      Object.assign(where, {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      });
    }
    const allUser = await prisma.user.findMany({
      where,
      skip: Number(skip),
      take: Number(limit),
    });

    const total = await prisma.user.count({
      where,
    });

    return { list: allUser, total };
  };

  updateUser = async (id: number, user: IUser) => {
    const updateUser = await prisma.user.update({
      where: { id },
      data: { ...user },
    });

    if (!updateUser) {
      throw new Error("User not found by id");
    }
    return updateUser;
  };

  deleteUser = async (id: number) => {
    const user = await prisma.user.delete({ where: { id } });
    if (!user) {
      throw new Error("User not found by id");
    }
  };
}

const userService = new UserService();
export default userService;
