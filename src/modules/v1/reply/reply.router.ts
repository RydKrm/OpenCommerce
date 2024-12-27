import express from "express";
import replyCrudRouter from "./router/reply_crud.controller";

const replyRouter = express.Router();

replyRouter.get("/", (req, res) => {
  res.json({ message: "This is the admin profile endpoint" });
});

replyRouter.use("/crud", replyCrudRouter);

export default replyRouter;
