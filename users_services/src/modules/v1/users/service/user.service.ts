import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
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

    // compare password

    if (!bcrypt.compareSync(data.password, user.password)) {
      return sendData(400, "Password is incorrect");
    }

    // generate jwt token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET_KEY || "",
      {
        expiresIn: "30d",
      }
    );

    return sendData(200, "User Data", {
      user: { ...user, password: null },
      token,
    });
  };

  register = async (data: IUser): Promise<IResponse> => {
    const isUserExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
      },
    });
    if (isUserExists) {
      return sendData(
        400,
        "User already exists with this email or phone number"
      );
    }

    // create a hash password from bcrypt
    const hashPassword = bcrypt.hashSync(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });
    return sendData(200, "User created successfully", newUser);
  };

  getSingle = async (id: string): Promise<IResponse> => {
    const singleUser = await prisma.user.findUnique({
      where: {
        id: id,
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
      where: query,
      skip,
      take: limit,
      omit:{
        password:true
      }
    });
    const count = await prisma.user.count();
    return sendData(200, "User Data", { list: allUser, count });
  };

  updateUser = async (
    id: string,
    user: IUpdateUser | undefined
  ): Promise<IResponse> => {
    try {
      const updateUser = await prisma.user.update({
        where: { id },
        data: { ...user },
      });
      return sendData(200, "User updated successfully", updateUser);
    } catch (error) {
      return sendData(400, "User not found by id");
    }
  };

  deleteUser = async (id: string) => {
    try {
      if(!id){
      return sendData(400, "User id is required");
    }
    const user = await prisma.user.delete({ where: { id } });
    if (!user) {
      return sendData(400, "User not found by id");
    }
    return sendData(200, "User deleted successfully");
    } catch (error) {
      return sendData(400, "User not found by id");
    }
  };
}

const userService = new UserService();
export default userService;
