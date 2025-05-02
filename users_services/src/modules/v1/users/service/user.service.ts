import IResponse from "@/types/IResponse";
import prisma from "../../../../database/prisma";
import { IUpdateUser, IUser, IUserLogin } from "../interface/user.interface";
import sendData from "@/lib/response/send_data";

export class UserService {
  login = async (data: IUserLogin): Promise<IResponse> => {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return sendData(400, "User not found by id");
    }
    return sendData(200, "User Data", user);
  };

  register = async (data: IUser): Promise<IResponse> => {
    const isUserExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (isUserExists) {
      return sendData(400, "User already exists with this email");
    }
    const newUser = await prisma.user.create({
      data,
    });
    return sendData(200, "User created successfully", newUser);
  };

  getSingle = async (id: number): Promise<IResponse> => {
    const singleUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!singleUser) {
      return sendData(400, "User not found by id");
    }

    return sendData(200, "User Data", singleUser);
  };

  getAllUser = async (
    limit = 10,
    skip = 0,
    search = ""
  ): Promise<IResponse> => {
    const query: any = {};

    if (search) {
      query["OR"] = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phoneNumber: { contains: search } },
      ];
    }

    const allUser = await prisma.user.findMany({
      skip,
      take: limit,
    });
    const count = await prisma.user.count();
    return sendData(200, "User Data", { list: allUser, count });
  };

  updateUser = async (
    id: number,
    user: IUpdateUser | undefined
  ): Promise<IResponse> => {
    const updateUser = await prisma.user.update({
      where: { id },
      data: { ...user },
    });

    if (!updateUser) {
      return sendData(400, "User not found by id");
    }
    return sendData(200, "User updated successfully", updateUser);
  };

  deleteUser = async (id: number): Promise<IResponse> => {
    const user = await prisma.user.delete({ where: { id } });
    if (!user) {
      return sendData(400, "User not found by id");
    }
    return sendData(200, "User deleted successfully");
  };
}

const userService = new UserService();
export default userService;
