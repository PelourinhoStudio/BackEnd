import { Request, Response } from "express";
import "../lib/env";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import UserModel from "../models/User";

export default class UsersController {
  //Create user
  async create(req: Request, res: Response) {

    // Our register logic starts here
  try {
    // Get user input
    const { body } = req;

    
    // Validate user input
    if (!(body.email && body.password && body.firstName && body.lastName)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await UserModel.findOne({ email: body.email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcryptjs.hash(body.password, 10);

    // Create user in our database

  
  body.password = encryptedPassword;

    const user = await UserModel.create(body);

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email: body.email},
      process.env.SECRET,
      {
        expiresIn: `${process.env.EXPIRESPASSWORD}`,
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our registe



  /*  const { body } = req;

    const newUser = await new UserModel(body);

    newUser
      .save()
      .then(() => {
        res.status(201);
        res.send(newUser);
      })
      .catch(res.status(400));*/
  }

  async login(req: Request, res:Response){
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await UserModel.findOne({ email });
  
      if (user && (await bcryptjs.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.SECRET,
          {
            expiresIn: `${process.env.EXPIRESPASSWORD}`,
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
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
