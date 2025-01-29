import express from "express";
import commentCrudRouter from "./routers/comment_crud.router";

const commentRouter = express.Router();

commentRouter.use("/crud", commentCrudRouter);

export default commentRouter;
