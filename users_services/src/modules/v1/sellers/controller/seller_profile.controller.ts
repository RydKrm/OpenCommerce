import { Request, Response } from "express";
import sellerProfileService, {
  SellerProfileService,
} from "../services/seller_profile.service";
import { negativeResponse, positiveResponse } from "@/lib/response/response";
import IRequest from "@/types/IRequest";
import { generateJwtToken } from "@/utils/generate-jwt-token";

class SellerProfileController {
  async login(req: IRequest, res: Response) {
    try {
      const { email, password } = req.body;
      const Seller = await sellerProfileService.login(email, password);
      const token = generateJwtToken({ id: Seller.id, role: "Seller" }).token;
      return positiveResponse(res, "Seller logged in successfully", {
        user: Seller.name,
        token,
        role: Seller.role,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async register(req: IRequest, res: Response) {
    try {
      const Seller = await sellerProfileService.register(req.body);
      return positiveResponse(res, "Seller registered successfully", Seller);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async updateSeller(req: IRequest, res: Response) {
    try {
      const { id } = req.params;
      const Seller = await sellerProfileService.updateSeller(
        Number(id),
        req.body
      );
      return positiveResponse(res, "Seller updated successfully", Seller);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async getSingleSeller(req: IRequest, res: Response) {
    try {
      const { id } = req.params;
      const Seller = await sellerProfileService.getSingle(Number(id));
      return positiveResponse(res, "Seller retrieved successfully", Seller);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async getAllSeller(req: IRequest, res: Response) {
    try {
      const Seller = await sellerProfileService.getAllSeller();
      return positiveResponse(res, "Seller retrieved successfully", {
        data: Seller,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async deleteSeller(req: IRequest, res: Response) {
    try {
      const { id } = req.params;
      await sellerProfileService.deleteSeller(Number(id));
      return positiveResponse(res, "Seller deleted successfully");
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async forgotPassword(req: IRequest, res: Response) {
    try {
      const { email } = req.body;
      const Seller = await sellerProfileService.forgotPassword(email);
      return positiveResponse(res, "Seller retrieved successfully", Seller);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async updatePassword(req: IRequest, res: Response) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
      const Seller = await sellerProfileService.changePassword(
        Number(id),
        oldPassword,
        newPassword
      );
      return positiveResponse(res, "Seller updated successfully", Seller);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }
}

const sellerProfileController = new SellerProfileController();
export default sellerProfileController;
