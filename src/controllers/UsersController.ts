import { Request, Response } from "express";
import UserModel from "../models/User";

export default class UsersController {
  async create(req: Request, res: Response) {
    const body = req.body;

    const newUser = await new UserModel(body);

    newUser
      .save()
      .then(() => {
        res.status(201);
        res.send(newUser);
      })
      .catch(res.status(400));
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await UserModel.find({});

    if (users) {
      res.status(200);
      res.send(users);
    } else {
      res.status(400);
    }
  }

  async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    if (user) {
      res.status(200);
      res.send(user);
    } else {
      res.status(400);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;

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
