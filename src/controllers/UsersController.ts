import { Request, Response } from "express";
import UserModel from "../models/User";

export default class UsersController {
  //Create user
  async create(req: Request, res: Response) {
    const { body } = req;

    const newUser = await new UserModel(body);

    newUser
      .save()
      .then(() => {
        res.status(201);
        res.send(newUser);
      })
      .catch(res.status(400));
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
