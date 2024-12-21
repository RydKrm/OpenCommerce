import express from "express";
import vendorCrudRoutes from "./routes/vendor.routes";
const vendorRouter = express.Router();

vendorRouter.use("/vendor", vendorCrudRoutes);

export default vendorRouter;
