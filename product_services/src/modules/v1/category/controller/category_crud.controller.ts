import categoryService from "../service/category_crud.service";
import IRequest from "@/types/IRequest";
import { Response } from "express";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";
import sendResponse from "@/lib/response/send_response";

class CategoryCrudController {
  create = async (req: IRequest, res: Response) => {
    const data = CreateCategoryDto.parse(req.body);
    const category = await categoryService.create(data);
    return sendResponse(res, category);
  };

  getAllCategory = async (req: IRequest, res: Response) => {
    const categories = await categoryService.getAllCategory();
    return sendResponse(res, categories);
  };

  getSingleCategory = async (req: IRequest, res: Response) => {
    const category = await categoryService.getSingle(req.params.id);
    return sendResponse(res, category);
  };

  updateCategory = async (req: IRequest, res: Response) => {
    const data = UpdateCategoryDto.parse(req.body);

    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      data
    );
    return sendResponse(res, updatedCategory);
  };

  deleteCategory = async (req: IRequest, res: Response) => {
    const response = await categoryService.deleteCategory(req.params.id);
    return sendResponse(res, response);
  };
}
const categoryCrudController = new CategoryCrudController();
export default categoryCrudController;
