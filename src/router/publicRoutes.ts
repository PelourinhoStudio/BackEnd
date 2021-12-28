import express from "express";
import ImagesController from "@controllers/ImageController";

const router = express.Router();
const imageController = new ImagesController();

router.get("/images", imageController.getAllImages);
router.get("/categories", imageController.getCategories);
router.get("/image/:id", imageController.getImageById);

export default router;