import express from "express";
import sellerProfileRouter from "./routes/sellerProfile.route";
const sellerRouter = express.Router();

sellerRouter.use("/profile", sellerProfileRouter);

export default sellerRouter;
