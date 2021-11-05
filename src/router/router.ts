import express from "express";
import UsersController from "../controllers/UsersController";
import ImagesController from "../controllers/ImageController";
export const router = express();

const usersController = new UsersController();

router.post("/users", usersController.create); //create user

router.get("/users", usersController.getAllUsers); //get all users

router.get("/users/:id", usersController.getUserById); //get ONE user by id

router.put("/users/:id", usersController.update); //update ONE user by id

router.delete("/users/:id", usersController.delete); // delete ONE user by id

//Images

const ImageController = new ImagesController();

router.post("/images", ImageController.create); //create image

router.get("/images", ImageController.getAllImages); //get all images

router.get("/images/:id", ImageController.getImageById); //get ONE image by id

router.put("/images/:id", ImageController.update); //update ONE image by id

router.delete("/images/:id", ImageController.delete); // delete ONE image by id      
