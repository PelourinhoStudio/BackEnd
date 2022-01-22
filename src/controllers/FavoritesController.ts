import FavoriteModel from "@models/Favorites";
import UserModel from "@models/User";
import { Request, Response } from "express";
import ImageModel from "../models/Image";

interface RequestWithToken extends Request {
    decoded: any;
  }
  
  export default class FavoritesController {
     // get all images favorited by user id
     async getFavoritesImages(req: RequestWithToken, res: Response) {
        try {
          const { user_id } = req.decoded.decoded;
    
          FavoriteModel.find({ user :  user_id}, {favorites:1}, (err, favorites) => {
            if (favorites) {
              res.status(200).json(favorites);
            } else {
              res.sendStatus(400);
            }
          }).populate({path: 'favorites', populate: {path: 'author', select:"-password -__v -state -userType"}});
        } catch (err) {
          console.error();
        }
      }
  
      async handleFavorite (req: RequestWithToken, res: Response) {
        try {
          const { user_id } = req.decoded.decoded;
          const { image_id } = req.params;

          console.log(image_id);
    
        FavoriteModel.findOne({user : user_id}, (err, userFavObj : any) => {
            console.log(userFavObj);

          if (userFavObj) {
              
            if (userFavObj.favorites.includes(image_id)) {
                
              userFavObj.favorites.splice(userFavObj.favorites.indexOf(image_id), 1);
            } else {
              userFavObj.favorites.push(image_id);
            }
  
            userFavObj.save((err, updatedUser) => {
              if (updatedUser) {
                res.status(201).json(updatedUser);
              } else {
                console.log(err);
                res.sendStatus(400);
              }
            });
          } else {
            res.sendStatus(400);
          }
        });
        
        } catch (err) {
          console.error();
        }
      }
  }