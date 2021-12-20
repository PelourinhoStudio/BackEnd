import express from "express";
import ImagesController from "@controllers/ImageController";

const router = express.Router();
const imageController = new ImagesController();

router.get("/", imageController.getAllImages);
router.get("/categories", imageController.getCategories);


export default router;