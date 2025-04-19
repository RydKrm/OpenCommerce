import { negativeResponse, positiveResponse } from "@/lib/response/response";
import IRequest from "@/types/IRequest";
import { Response } from "express";
import AddressCRUDService from "../service/address_crud.service";
export class AddressCRUDController {
  // Add your methods and properties here
  constructor() {
    // Initialization code
  }

  async createAddress(req: IRequest, res: Response) {
    try {
      const addressData = req.body;
      const newAddress = await AddressCRUDService.createAddress(addressData);
      return positiveResponse(res, "Address created successfully", {
        data: newAddress,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error creating address";
      return negativeResponse(res, errorMessage);
    }
  }

  async getSingleAddress(req: IRequest, res: Response) {
    try {
      const addressId = req.params.id;
      const address = await AddressCRUDService.getSingleAddress(addressId);
      return positiveResponse(res, "Address retrieved successfully", {
        data: address,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error retrieving address";
      return negativeResponse(res, errorMessage);
    }
  }

  async getAllAddress(req: IRequest, res: Response) {
    try {
      const addressList = await AddressCRUDService.getAllAddress(req);
      return positiveResponse(res, "Address list retrieved successfully", {
        data: addressList,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error retrieving address list";
      return negativeResponse(res, errorMessage);
    }
  }

  async updateAddress(req: IRequest, res: Response) {
    try {
      const updatedAddress = await AddressCRUDService.updateAddress(req);
      return positiveResponse(res, "Address updated successfully", {
        data: updatedAddress,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error updating address";
      return negativeResponse(res, errorMessage);
    }
  }

  async deleteAddress(req: IRequest, res: Response) {
    try {
      const deletedAddress = await AddressCRUDService.deleteAddress(req);
      return positiveResponse(res, "Address deleted successfully", {
        data: deletedAddress,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error deleting address";
      return negativeResponse(res, errorMessage);
    }
  }
}

const addressCRUDController = new AddressCRUDController();
export default addressCRUDController;
