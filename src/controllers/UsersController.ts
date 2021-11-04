import { Request, Response } from "express";
import UserModel from "../models/User";

export default class UsersController {
  async create(req: Request, res: Response) {
    const body = req.body;

    const newUser = await new UserModel(body);

    newUser.save().then(() => {
      res.status(200);
      res.send(newUser);
    });
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await UserModel.find({});

    if (users) {
      res.status(200);
      res.send(users);
    }
  }

  async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    if (user) {
      res.status(200);
      res.send(user);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (updatedUser) {
      res.status(200);
      res.send(updatedUser);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndRemove(id);

    if (deletedUser) {
      res.status(200);
      res.send(deletedUser);
    }
  }
}
