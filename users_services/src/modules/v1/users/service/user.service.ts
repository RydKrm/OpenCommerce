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
    const newUser = await prisma.user.create({
      data: {
        ...data,
      },
    });

    return newUser;
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

    return singleUser;
  };

  getAllUser = async () => {
    const allUser = await prisma.user.findMany();
    return allUser;
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
