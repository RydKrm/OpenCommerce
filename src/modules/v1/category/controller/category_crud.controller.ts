import { negativeResponse, positiveResponse } from "@/lib/response/response";
import categoryService from "../service/category_crud.service";
import IRequest from "@/types/IRequest";
import { Response } from "express";

class CategoryCrudController {
  create = async (req: IRequest, res: Response) => {
    try {
      const category = await categoryService.create(req.body);
      return positiveResponse(res, "Category created successfully", {
        data: category,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  getAllCategory = async (req: IRequest, res: Response) => {
    try {
      const categories = await categoryService.getAllCategory();
      return positiveResponse(res, "Categories retrieved successfully", {
        data: categories,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  getSingleCategory = async (req: IRequest, res: Response) => {
    try {
      const category = await categoryService.getSingle(Number(req.params.id));
      return positiveResponse(res, "Category retrieved successfully", {
        data: category,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  updateCategory = async (req: IRequest, res: Response) => {
    try {
      const updatedCategory = await categoryService.updateCategory(
        Number(req.params.id),
        req.body
      );
      return positiveResponse(res, "Category updated successfully", {
        data: updatedCategory,
      });
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };

  deleteCategory = async (req: IRequest, res: Response) => {
    try {
      await categoryService.deleteCategory(Number(req.params.id));
      return positiveResponse(res, "Category deleted successfully");
    } catch (err: any) {
      return negativeResponse(res, err.message);
    }
  };
}
const categoryCrudController = new CategoryCrudController();
export default categoryCrudController;
