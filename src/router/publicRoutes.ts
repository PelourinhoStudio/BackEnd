import express from "express";
import ImagesController from "@controllers/ImageController";
import UsersController from "@controllers/UsersController";

const router = express.Router();
const imageController = new ImagesController();
const usersController = new UsersController();

router.get("/images", imageController.getAllImages);
router.get("/categories", imageController.getCategories);
router.get("/category/:category", imageController.getImagesByCategory);
router.get("/search", imageController.searchImages);
router.get("/image/:id", imageController.getImageById);



export default router;
