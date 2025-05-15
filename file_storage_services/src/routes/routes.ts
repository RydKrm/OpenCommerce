import express from "express";
const router = express.Router();
import * as controller from "../controllers/index";

router.get("/health", (req, res) => {
  res.send("Hello, File storing Services is UP!");
});

router.post("/upload", controller.upload);

router.post("/deleteMany", controller.deleteMany);

router.post("/copy", controller.copyFileController);

router.post("/move", controller.move);

router.post("/deleteSingle", controller.deleteSingle);

export default router;
