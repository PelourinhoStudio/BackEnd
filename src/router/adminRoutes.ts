import express from "express";
import UsersController from "@controllers/UsersController";
import ImagesController from "@controllers/ImageController";
import AuthController from "@controllers/AuthController";

const router = express.Router();
const usersController = new UsersController();
const imageController = new ImagesController();
const authController = new AuthController();

router.use(authController.verifyTokenAdmin);

router
  .route("/users")
  .get(usersController.getAllUsers);

router
  .route("/users/:id")
  .get(usersController.getUserById)
  .put(usersController.update)
  .delete(usersController.delete);

router.get("/users/state/:state", usersController.getUsersByState);

router.get("/users/type/:type", usersController.getUsersByType);

router
  .route("/images")
  .post(imageController.create)
  .get(imageController.getAllImages);

router
  .route("/images/:id")
  .get(imageController.getImageById)
  .put(imageController.update)
  .delete(imageController.delete);

router.post("/images/tags", imageController.getImagesByTags);
/*
  example of body
  {
    "tags": ["something", "else", "whatever"],
  }
*/

router.post("/images/category", imageController.getImagesByCategory);
/*
  example of body
  {
    "category": ["something", "else", "whatever"],
  }
*/

export default router;