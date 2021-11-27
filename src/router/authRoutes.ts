import express from "express";
import UsersController from "@controllers/UsersController";
import AuthController from "@controllers/AuthController";

const router = express.Router();
const authController = new AuthController();
const usersController = new UsersController();

//Create user
router.post("/register", usersController.create);
//Login user
router.post("/login", authController.login);

export default router;