import { negativeResponse, positiveResponse } from "@/lib/response/response";
import IRequest from "@/types/IRequest";
import { Response } from "express";
import vendorCrudService from "../service/vendor_crud.service";

class VentorCrudController {
  create = async (req: IRequest, res: Response) => {
    try {
      const vendor = await vendorCrudService.create(req.body);
      return positiveResponse(res, "Vendor created successfully", {
        data: vendor,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  login = async (req: IRequest, res: Response) => {
    try {
      const { email, password } = req.body;
      const vendor = await vendorCrudService.login(email, password);
      return positiveResponse(res, "Vendor login successfully", {
        data: vendor,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  getAll = async (req: IRequest, res: Response) => {
    try {
      const vendors = await vendorCrudService.getAll(req);
      return positiveResponse(res, "Vendors retrieved successfully", vendors);
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  getSingle = async (req: IRequest, res: Response) => {
    try {
      const vendor = await vendorCrudService.getSingle(Number(req.params.id));
      vendor.password = "";
      return positiveResponse(res, "Vendor retrieved successfully", {
        data: vendor,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  update = async (req: IRequest, res: Response) => {
    try {
      const updatedVendor = await vendorCrudService.update(
        Number(req.params.id),
        req.body
      );
      updatedVendor.password = "";
      return positiveResponse(res, "Vendor updated successfully", {
        data: updatedVendor,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  delete = async (req: IRequest, res: Response) => {
    try {
      await vendorCrudService.delete(Number(req.params.id));
      return positiveResponse(res, "Vendor deleted successfully");
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };
}

const vendorCrudController = new VentorCrudController();
export default vendorCrudController;
