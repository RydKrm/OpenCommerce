import auth from "@/auth/authenticate";
import { ROLES } from "@/types/role";
import validator from "@/utils/validator";
import express, { Response } from "express";
import addressCrudDto from "../dto/address.dto";
import crudLibrary from "@/lib/crud/crud.lib";
import IRequest from "@/types/IRequest";
const addressCrudRouter = express.Router();

addressCrudRouter.post(
  "/create",
  auth([ROLES.USER]),
  validator(addressCrudDto.create),
  crudLibrary.create("address")
);

addressCrudRouter.get(
  "/single/:id",
  auth([ROLES.USER]),
  crudLibrary.getSingle("address")
);

addressCrudRouter.get(
  "/all-by-user/:userId",
  auth([ROLES.USER]),
  async (req: IRequest, res: Response) => {
    crudLibrary.getMany("address", {
      where: {
        userId: req.user.id,
      },
    });
  }
);

addressCrudRouter.put(
  "/update/:id",
  auth([ROLES.USER]),
  validator(addressCrudDto.create),
  crudLibrary.update("address")
);

addressCrudRouter.delete(
  "/delete/:id",
  auth([ROLES.USER]),
  crudLibrary.delete("address")
);

export default addressCrudRouter;
