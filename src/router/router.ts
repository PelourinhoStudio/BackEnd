import express from "express";
import UsersController from "../controllers/UsersController";
import ImagesController from "../controllers/ImageController";
export const router = express();
const auth = require("./middleware/auth");







//Users
const usersController = new UsersController();

//Create user
router.post("/register", usersController.create)

//Login user
router.post("/login", usersController.login)

//Get all users
router.get("/users", auth, usersController.getAllUsers);

//Get one user by id
router.get("/users/:id",auth,  usersController.getUserById);

//Get users by state
router.get("/users/state/:state", auth, usersController.getUsersByState);

//Get users by userType
router.get("/users/type/:type",auth,  usersController.getUsersByType);

//Get users by lastOnline
router.get("/users", auth, usersController.getUsersByType);

//Update one user by id
router.put("/users/:id",auth,  usersController.update);

//Delete one user by id
router.delete("/users/:id", auth, usersController.delete);

//Images
const ImageController = new ImagesController();

//Create image
router.post("/images", ImageController.create);

//Get all images
router.get("/images",auth,  ImageController.getAllImages);

//Get one image by id
router.get("/images/:id", auth, ImageController.getImageById);

//Get all images of a category
router.get("/images/category/:category", auth, ImageController.getImagesByCategory);

//Update one image by id
router.put("/images/:id",auth,  ImageController.update);

//Delete one image by id
router.delete("/images/:id", auth, ImageController.delete);
