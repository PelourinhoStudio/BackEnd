import { Request, Response } from "express";
import UserModel from "../models/User";

export default class UsersController {
  async create(req: Request, res: Response) {
    const body = req.body

    let newUser = await new UserModel(body);
  
    newUser.save()
  }
}


// function findAll() {
//   return new Promise((resolve, reject) => {
//     UserModel.find({}, (err, users) => {
//       if (err) reject(err);

//       resolve(users);
//     });
//   });
// }
