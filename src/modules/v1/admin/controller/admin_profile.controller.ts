import { Request, Response } from "express";
import adminProfileService, {
  AdminProfileService,
} from "../services/admin_profile.service";
import { negativeResponse, positiveResponse } from "@/lib/response/response";
import IRequest from "@/types/IRequest";
import { generateJwtToken } from "@/utils/generate-jwt-token";

class AdminProfileController {
  async login(req: IRequest, res: Response) {
    try {
      const { email, password } = req.body;
      const admin = await adminProfileService.login(email, password);
      const token = generateJwtToken({ id: admin.id, role: "admin" }).token;
      return positiveResponse(res, "Admin logged in successfully", {
        user: admin.name,
        token,
        role: admin.role,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async register(req: IRequest, res: Response) {
    try {
      const admin = await adminProfileService.register(req.body);
      return positiveResponse(res, "Admin registered successfully", admin);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async updateAdmin(req: IRequest, res: Response) {
    try {
      const { id } = req.params;
      const admin = await adminProfileService.updateAdmin(Number(id), req.body);
      return positiveResponse(res, "Admin updated successfully", admin);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async getSingleAdmin(req: IRequest, res: Response) {
    try {
      const { id } = req.params;
      const admin = await adminProfileService.getSingle(Number(id));
      return positiveResponse(res, "Admin retrieved successfully", admin);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async getAllAdmin(req: IRequest, res: Response) {
    try {
      const admin = await adminProfileService.getAllAdmin();
      return positiveResponse(res, "Admin retrieved successfully", {
        data: admin,
      });
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async deleteAdmin(req: IRequest, res: Response) {
    try {
      const { id } = req.params;
      await adminProfileService.deleteAdmin(Number(id));
      return positiveResponse(res, "Admin deleted successfully");
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async forgotPassword(req: IRequest, res: Response) {
    try {
      const { email } = req.body;
      const admin = await adminProfileService.forgotPassword(email);
      return positiveResponse(res, "Admin retrieved successfully", admin);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }

  async updatePassword(req: IRequest, res: Response) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
      const admin = await adminProfileService.changePassword(
        Number(id),
        oldPassword,
        newPassword
      );
      return positiveResponse(res, "Admin updated successfully", admin);
    } catch (error: any) {
      return negativeResponse(res, error.message);
    }
  }
}

const adminProfileController = new AdminProfileController();
export default adminProfileController;
