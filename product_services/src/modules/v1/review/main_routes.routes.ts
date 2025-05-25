import express, { Request, Response } from "express";
import {
  CreateReview,
  GetSingleReview,
  GetReviewsByUser,
  GetReviewsByProduct,
  UpdateReview,
  DeleteReview,
} from "./services/review_basic.service";
import { asyncHandler } from "@/middleware";
import { createReviewDto, updateReviewDto } from "./dto/review.dto";
import sendResponse from "@/lib/response/send_response";
import { IQuery } from "@/types/IQuery";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Review route working!" });
});

// Create Review
router.post(
  "/create",
  asyncHandler(async (req: Request, res: Response) => {
    const data = createReviewDto.parse(req.body);
    const result = await CreateReview(data);
    return sendResponse(res, result);
  })
);

// Get Single Review
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await GetSingleReview(req.params.id);
    return sendResponse(res, result);
  })
);

// Get Reviews By User
router.get(
  "/user/:userId",
  asyncHandler(async (req: Request, res: Response) => {
    const query = req.query as IQuery;

    const result = await GetReviewsByUser(req.params.userId, query);
    return sendResponse(res, result);
  })
);

// Get Reviews By Product
router.get(
  "/product/:productId",
  asyncHandler(async (req: Request, res: Response) => {
    const query = req.query as IQuery;
    const result = await GetReviewsByProduct(req.params.productId, query);
    return sendResponse(res, result);
  })
);

// Update Review
router.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const data = updateReviewDto.parse(req.body);
    const result = await UpdateReview(req.params.id, data);
    return sendResponse(res, result);
  })
);

// Delete Review
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const result = await DeleteReview(req.params.id);
    return sendResponse(res, result);
  })
);

export default router;
