import express from "express";
import UsersController from "../controllers/UsersController";
import ImagesController from "../controllers/ImageController";
export const router = express();
import verifytoken from "../middleware/auth";
//Users
const usersController = new UsersController();

//Create user
router.post("/register", usersController.create);

//Login user
router.post("/login", usersController.login);

//Get all users
router.get("/users", verifytoken, usersController.getAllUsers);

//Get one user by id
router.get("/users/:id", verifytoken, usersController.getUserById);

//Get users by state
router.get("/users/state/:state", verifytoken, usersController.getUsersByState);

//Get users by userType
router.get("/users/type/:type", verifytoken, usersController.getUsersByType);

//Get users by lastOnline
router.get("/users", verifytoken, usersController.getUsersByType);

//Update one user by id
router.put("/users/:id", verifytoken, usersController.update);

//Delete one user by id
router.delete("/users/:id", verifytoken, usersController.delete);

//Images
const ImageController = new ImagesController();

//Create image
router.post("/images", ImageController.create);

//Get all images
router.get("/images", verifytoken, ImageController.getAllImages);

//Get one image by id
router.get("/images/:id", verifytoken, ImageController.getImageById);

//Get all images of a category
router.get(
  "/images/category/:category",
  verifytoken,
  ImageController.getImagesByCategory
);

//Get images from tags
/*
  example of body
  {
    "tags": ["something", "else", "whatever"]
  }
*/
router.post("/images/tags", ImageController.getImagesByTags);

//Update one image by id
router.put("/images/:id", verifytoken, ImageController.update);

//Delete one image by id
router.delete("/images/:id", verifytoken, ImageController.delete);
