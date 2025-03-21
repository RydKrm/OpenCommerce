import auth from "@/auth/authenticate";
import { ROLES } from "@/types/role";
import validator from "@/utils/validator";
import express, { NextFunction, Response } from "express";
import addressCrudDto from "../dto/address.dto";
import crudLibrary from "@/lib/crud/crud.lib";
import IRequest from "@/types/IRequest";
const addressCrudRouter = express.Router();

addressCrudRouter.post(
  "/create",
  // auth([ROLES.USER]),
  async (req: IRequest, res: Response, next: NextFunction) => {
    req.body["userId"] = Number(req.headers.userid);
    next();
  },
  validator(addressCrudDto.create),
  crudLibrary.create("address")
);

addressCrudRouter.get(
  "/single/:id",
  auth([ROLES.USER]),
  crudLibrary.getSingle("address")
);

addressCrudRouter.get(
  "/allByUser/:userId",
  async (req: IRequest, res: Response) => {
    console.log("testing calls");
    crudLibrary.getMany("address", {
      where: {
        userId: Number(req?.headers?.id),
      },
    });
    // return res.status(200).json({
    //   message: "All addresses by user",
    //   data: "",
    // });
  }
);

addressCrudRouter.put(
  "/update/:id",
  validator(addressCrudDto.update),
  crudLibrary.update("address")
);

addressCrudRouter.delete("/delete/:id", crudLibrary.delete("address"));

export default addressCrudRouter;
