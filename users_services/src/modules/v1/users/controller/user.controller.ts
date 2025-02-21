import userService, { UserService } from "./../service/user.service";
import { Request, Response } from "express";
import {
  negativeResponse,
  positiveResponse,
} from "../../../../lib/response/response";
import { generateJwtToken } from "../../../../utils/generate-jwt-token";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const user = await userService.login(req.body);
      const token = generateJwtToken({ id: user.id, role: "user" });
      return positiveResponse(res, "Login successfully", { token });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const user = await userService.register(req.body);
      return positiveResponse(res, "User registered successfully", user);
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  getSingle = async (req: Request, res: Response) => {
    try {
      const user = await userService.getSingle(Number(req.params.id));
      return positiveResponse(res, "User retrieved successfully", user);
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  getAllUser = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUser();
      return positiveResponse(res, "Users retrieved successfully", users);
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const updatedUser = await userService.updateUser(
        Number(req.params.id),
        req.body
      );
      return positiveResponse(res, "User updated successfully", updatedUser);
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      await userService.deleteUser(Number(req.params.id));
      return positiveResponse(res, "User deleted successfully");
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };
}

const userController = new UserController();
export default userController;
