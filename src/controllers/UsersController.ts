import { Request, Response } from "express";
import "../lib/env";
import bcryptjs from "bcryptjs";
import UserModel from "../models/User";

const ITEMS_PER_PAGE = 10;
interface RequestWithToken extends Request {
  token: any;
}
export default class UsersController {
  async create(req: Request, res: Response) {
    try {
      let { body } = req;

      if (!(body.email && body.password && body.firstName && body.lastName)) {
        res.status(400).send("All input is required");
      }

      if (await UserModel.findOne({ email: body.email })) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      body.password = await bcryptjs.hash(body.password, 10);

      UserModel.create(body, (err, newUser) => {
        if (newUser) {
          res.status(201).json(newUser);
        } else {
          res.sendStatus(400);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const { page = 1 }: any = req.query;

      UserModel.find({}, function (err, users) {
        if (users) {
          res.status(200).json(users);
        } else {
          res.sendStatus(400);
        }
      })
        .limit(ITEMS_PER_PAGE)
        .skip((page - 1) * ITEMS_PER_PAGE)
        .sort([[req.query.orderBy, req.query.direction]]);
    } catch (err) {
      console.error(err);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      UserModel.findById(id, (err, user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.sendStatus(400);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getUsersByState(req: Request, res: Response) {
    try {
      const { state } = req.params;
      const { page = 1 }: any = req.query;

      UserModel.find({ state: state }, (err, users) => {
        if (users) {
          res.status(200).json(users);
        } else {
          res.sendStatus(400);
        }
      })
        .limit(ITEMS_PER_PAGE)
        .skip((page - 1) * ITEMS_PER_PAGE)
        .sort([[req.query.orderBy, req.query.direction]]);
    } catch (err) {
      console.error(err);
    }
  }

  async getUsersByType(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const { page = 1 }: any = req.query;

      UserModel.find({ userType: type }, (err, users) => {
        if (users) {
          res.status(200).json(users);
        } else {
          res.sendStatus(400);
        }
      })
        .limit(ITEMS_PER_PAGE)
        .skip((page - 1) * ITEMS_PER_PAGE)
        .sort([[req.query.orderBy, req.query.direction]]);
    } catch (err) {
      console.error(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;

      UserModel.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        },
        (err, updatedUser) => {
          if (updatedUser) {
            res.status(201).json(updatedUser);
          } else {
            res.sendStatus(400);
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      UserModel.findByIdAndRemove(id, (err, deletedUser) => {
        if (deletedUser) {
          res.status(200).json(deletedUser);
        } else {
          res.sendStatus(400);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async whoAmI(req: RequestWithToken, res: Response) {
    try {
      const token = req.token;

      UserModel.findById(
        token.decoded.user_id,
        "-password -__v",
        (err, user) => {
          if (user) {
            res.status(200).json(user);
          } else {
            res.sendStatus(400);
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
}
