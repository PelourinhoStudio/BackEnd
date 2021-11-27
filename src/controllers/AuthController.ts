import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import UserModel from "@models/User";

interface RequestWithToken extends Request {
  decoded: any;
}

export default class AuthController {
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

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email: user.email, role: user.userType },
          process.env.SECRET,
          {
            expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
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

  async verifyTokenAdmin(req: Request, res: Response, next: NextFunction) {
    const token =
      req.headers["x-access-token"] && req.headers["x-access-token"].toString();

    if (!token) {
      return res.sendStatus(403);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      try {
        if (err) {
          console.error(err.message);
          return res.sendStatus(403);
        }

        if (decoded.role != "admin") {
          return res.sendStatus(401);
        }

        next();
      } catch (err) {
        console.error(err);
      }
    });
  }

    async verifyTokenLoggedIn(
    req: RequestWithToken,
    res: Response,
    next: NextFunction
  ) {
    try {
      let token =
        req.headers["x-access-token"] &&
        req.headers["x-access-token"].toString();

      if (!token) {
        return res.sendStatus(401);
      }

      jwt.verify(
        token,
        process.env.SECRET,
        (err: JsonWebTokenError, decoded) => {
          if (err) {
            console.error(err.message);
            return res.sendStatus(403);
          }

          req.decoded = { auth: true, decoded };

          next();
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
}
