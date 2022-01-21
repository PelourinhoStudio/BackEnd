import express from "express";
import UsersController from "@controllers/UsersController";
import ImagesController from "@controllers/ImageController";
import AuthController from "@controllers/AuthController";
import FavoritesController from "@controllers/FavoritesController";


const router = express.Router();
const usersController = new UsersController();
const imageController = new ImagesController();
const authController = new AuthController();
const favoriteController = new FavoritesController();

router.use(authController.verifyTokenLoggedIn);

router.get("/", usersController.whoAmI);
router
  .route("/images")
  .get(imageController.getMyImages)
  .post(imageController.create);

router.route("/images/like/:id").put(imageController.handleLike);

router.route("/images/liked").get(imageController.getLikedImages);

router.route("/images/favorites").get(favoriteController.getFavoritesImages);

router.route("/images/favorites/:image_id").put(favoriteController.handleFavorite);

export default router;
