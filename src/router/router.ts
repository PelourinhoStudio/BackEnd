import express from "express";
import UsersController from "../controllers/UsersController";

export const router = express();

const usersController = new UsersController();

router.post("/users", usersController.create); //create user

router.get("/users", usersController.getAllUsers); //get all users

router.get("/users/:id", usersController.getUserById); //get ONE user by id

router.put("/users/:id", usersController.update); //update ONE user by id

router.delete("/users/:id", usersController.delete); // delete ONE user by id

//Images

/* router.get('/images', ImageController); //get all images

router.get('/images/new', ImageController); //show form to upload ONE new image

router.post('/images', ImageController); // add new image to database, then redirect

router.get('/images/:id', ImageController); // get ONE image by id

router.get('/images/:id/edit', ImageController); // show edit form of ONE image

router.put('/images/:id', ImageController); // update ONE image by id, then redirect

router.delete('/images/:id', ImageController); // delete ONE image by id, then redirect       */
