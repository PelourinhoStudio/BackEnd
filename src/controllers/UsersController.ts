import { Request, Response } from "express";
import "../lib/env";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import UserModel from "../models/User";

export default class UsersController {
  //Create user
  async create(req: Request, res: Response) {
    try {
      let { body } = req;

      if (!(body.email && body.password && body.firstName && body.lastName)) {
        res.status(400).send("All input is required");
      }

      const oldUser = await UserModel.findOne({ email: body.email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      const encryptedPassword = await bcryptjs.hash(body.password, 10);

      body.password = encryptedPassword;
    } catch (err) {
      console.log(err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      let user = await UserModel.findOne({ email });

      if (user && (await bcryptjs.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email: user.email, role: user.userType },
          process.env.SECRET,
          {
            expiresIn: `${process.env.EXPIRESPASSWORD}`,
          }
        );

        console.log(user);
        res.status(200).json(token);
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  }

  //Get all users
  async getAllUsers(req: Request, res: Response) {
    const users = await UserModel.find({});

    if (users) {
      res.status(200);
      res.send(users);
    } else {
      res.status(400);
    }
  }

  //Get one user by id
  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (user) {
      res.status(200);
      res.send(user);
    } else {
      res.status(400);
    }
  }

  //Get users by state
  async getUsersByState(req: Request, res: Response) {
    const { state } = req.params;

    const users = await UserModel.find({ state: [state] });

    if (users) {
      res.status(200);
      res.send(users);
    } else {
      res.status(400);
    }
  }

  //Get users by userType
  async getUsersByType(req: Request, res: Response) {
    const { type } = req.params;

    const users = await UserModel.find({ userType: [type] });

    if (users) {
      res.status(200);
      res.send(users);
    } else {
      res.status(400);
    }
  }

  //Update one user by id
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const updatedUser = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (updatedUser) {
      res.status(201);
      res.send(updatedUser);
    } else {
      res.status(400);
    }
  }

  //Delete one user by id
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndRemove(id);

    if (deletedUser) {
      res.status(200);
      res.send(deletedUser);
    } else {
      res.status(400);
    }
  }
}
