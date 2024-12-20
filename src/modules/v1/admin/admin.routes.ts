import express from "express";
import adminProfileRouter from "./routes/adminProfile.route";

const adminRouter = express.Router();
adminRouter.use("/profile", adminProfileRouter);

export default adminRouter;
