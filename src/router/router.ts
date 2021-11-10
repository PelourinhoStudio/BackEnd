import express from "express";
import UsersController from "../controllers/UsersController";
import ImagesController from "../controllers/ImageController";
export const router = express();

//Users
const usersController = new UsersController();

//Create user
router.post("/users", usersController.create);

//Get all users
router.get("/users", usersController.getAllUsers);

//Get one user by id
router.get("/users/:id", usersController.getUserById);

//Get users by state
router.get("/users/state/:state", usersController.getUsersByState);

//Get users by userType
router.get("/users/type/:type", usersController.getUsersByType);

//Get users by lastOnline
router.get("/users", usersController.getUsersByType);

//Update one user by id
router.put("/users/:id", usersController.update);

//Delete one user by id
router.delete("/users/:id", usersController.delete);

//Images
const ImageController = new ImagesController();

//Create image
router.post("/images", ImageController.create);

//Get all images
router.get("/images", ImageController.getAllImages);

//Get one image by id
router.get("/images/:id", ImageController.getImageById);

//Get all images of a category
router.get("/images/category/:category", ImageController.getImagesByCategory);

//Update one image by id
router.put("/images/:id", ImageController.update);

//Delete one image by id
router.delete("/images/:id", ImageController.delete);
