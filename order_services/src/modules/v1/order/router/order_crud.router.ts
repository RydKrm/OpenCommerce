import express from "express";
const crudRouter = express.Router();
import orderCrudDto from "../dto/order_crud.dto";
import orderCrudController from "../controller/order_crud.controller";
import validator from "@/utils/validator";

crudRouter.get("/", (req, res) => {
  res.json({ message: "This is the product crud route" });
});

crudRouter.post(
  "/create",
  validator(orderCrudDto.create),
  orderCrudController.create
);

crudRouter.get("/all", orderCrudController.getAllOrder);

crudRouter.get("/:orderId", orderCrudController.singleOrder);

crudRouter.get(
  "/get-all-by-userId/:userId",
  orderCrudController.getAllOrderByUserId
);

crudRouter.get(
  "/get-all-by-productId/:productId",
  orderCrudController.getAllOrderByProductId
);

crudRouter.patch(
  "/update/:orderId",
  validator(orderCrudDto.update),
  orderCrudController.update
);

crudRouter.patch("/update-status/:orderId", orderCrudController.updateStatus);

crudRouter.delete("/delete/:orderId", orderCrudController.deleteOrder);

export default crudRouter;
