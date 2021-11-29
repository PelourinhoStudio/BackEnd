import express from "express";
import UsersController from "@controllers/UsersController";
import ImagesController from "@controllers/ImageController";
import AuthController from "@controllers/AuthController";

const router = express.Router();
const usersController = new UsersController();
const imageController = new ImagesController();
const authController = new AuthController();

router.use(authController.verifyTokenLoggedIn);

router.get("/", usersController.whoAmI);

export default router;
