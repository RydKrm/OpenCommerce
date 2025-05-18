import express, { Request, Response } from "express";
import addressController from "../controller/address_crud.controller";
import { asyncHandler } from "@/middleware";
import { CreateAddressDto } from "../dto/address.dto";
import {
  createAddress,
  deleteAddress,
  getAllAddress,
  getSingleAddress,
  updateAddress,
} from "../service/address_crud.service";
import sendResponse from "@/lib/response/send_response";
import IRequest from "@/types/IRequest";
const addressCrudRouter = express.Router();

addressCrudRouter.post(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    const data = CreateAddressDto.parse(req.body);
    const address = await createAddress(data);
    return sendResponse(res, address);
  })
);

addressCrudRouter.get(
  "/single/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const address = await getSingleAddress(req.params.id);
    return sendResponse(res, address);
  })
);

addressCrudRouter.get(
  "/allByUser/",
  asyncHandler(async (req: IRequest, res: Response) => {
    const userId = req.user_id as string;
    const address = await getAllAddress(userId, req.query);
    return sendResponse(res, address);
  })
);

addressCrudRouter.put(
  "/update/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const data = CreateAddressDto.parse(req.body);
    const address = await updateAddress(req.params.id, data);
    return sendResponse(res, address);
  })
);

addressCrudRouter.delete(
  "/delete/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const address = await deleteAddress(req.params.id);
    return sendResponse(res, address);
  })
);

export default addressCrudRouter;
