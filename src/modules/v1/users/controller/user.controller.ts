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
}

const userController = new UserController();
export default userController;
