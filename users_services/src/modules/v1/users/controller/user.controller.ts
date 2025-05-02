import userService, { UserService } from "./../service/user.service";
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware";
import sendResponse from "@/lib/response/send_response";
import { userDto } from "../dto/user.dto";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  login = asyncHandler(async (req: Request, res: Response) => {
    const validated = userDto.login.parse(req.body);
    const result = await userService.login(validated);
    return sendResponse(res, result);
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = userDto.register.parse(req.body);
    const user = await userService.register(reqBody);
    return sendResponse(res, user);
  });

  getSingle = asyncHandler(async (req: Request, res: Response) => {
    return sendResponse(
      res,
      await userService.getSingle(Number(req.params.id))
    );
  });

  getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const limit = Number(req?.query?.limit);
    const skip = Number(req?.query?.skip);
    const search = req?.query?.search as string;
    return sendResponse(res, await userService.getAllUser(limit, skip, search));
  });

  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const reqBody = userDto.updateUser.parse(req.body);
    const user = await userService.updateUser(Number(req.params.id), reqBody);
    return sendResponse(res, user);
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    return sendResponse(res, await userService.deleteUser(userId));
  });
}

const userController = new UserController();
export default userController;
