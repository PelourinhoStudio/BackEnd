const UsersController = require("../controllers/UsersController");
import User from "../models/User";

export const service = UsersController(User);
