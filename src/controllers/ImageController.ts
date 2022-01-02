import { Request, Response } from "express";
import ImageModel from "../models/Image";

interface RequestWithToken extends Request {
  decoded: any;
}

export default class ImageController {
  async create(req: Request, res: Response) {
    try {
      const { body } = req;

      ImageModel.create(body, (err, newImage) => {
        if (newImage) {
          res.status(201).json(newImage);
        } else {
          res.sendStatus(400);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getAllImages(req: Request, res: Response) {
    try {
      ImageModel.find({}, (err, images) => {
        if (images) {
          res.status(200).json(images);
        } else {
          res.sendStatus(400);
        }
      }).populate("author", "-password -__v -state -userType");
    } catch (err) {
      console.error();
    }
  }

  async getImageById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      ImageModel.findById(id, (err, image) => {
        if (image) {
          res.status(200).json(image);
        } else {
          res.sendStatus(400);
        }
      }).populate("author", "-password -__v -state -userType");
    } catch (err) {
      console.error();
    }
  }

  async getImagesByCategory(req: Request, res: Response) {
    try {
      const { body } = req.body;

      ImageModel.find(
        {
          category: body.category,
        },
        (err, images) => {
          if (images) {
            res.status(200).json(images);
          } else {
            res.sendStatus(400);
          }
        }
      ).populate("author", "-password -__v -state -userType");
    } catch (err) {
      console.error();
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      ImageModel.distinct("category", (err, categories) => {
        if (categories) {
          res.status(200).json(categories);
        } else {
          res.sendStatus(400);
        }
      });
    } catch (err) {
      console.error();
    }
  }

  async getImagesByTags(req: Request, res: Response) {
    try {
      const { body } = req;

      ImageModel.find({ tags: body.tags }, (err, images) => {
        if (images) {
          res.status(200).json(images);
        } else {
          res.sendStatus(400);
        }
      }).populate("author", "-password -__v -state -userType");
    } catch (err) {
      console.error();
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;

      ImageModel.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        },
        (err, updatedImage) => {
          if (updatedImage) {
            res.status(201).json(updatedImage);
          } else {
            res.sendStatus(400);
          }
        }
      );
    } catch (err) {
      console.error();
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      ImageModel.findByIdAndRemove(id, (err, deletedImage) => {
        if (deletedImage) {
          res.status(200).json(deletedImage);
        } else {
          res.sendStatus(400);
        }
      });
    } catch (err) {
      console.error();
    }
  }

  async getMyImages(req: RequestWithToken, res: Response) {
    try {
      const { user_id } = req.decoded.decoded;

      ImageModel.find({ author: user_id }, (err, images) => {
        if (images) {
          res.status(200).json(images);
        } else {
          res.sendStatus(400);
        }
      }).populate("author", "-password -__v -state -userType");
    } catch (err) {
      console.error();
    }
  }

  // get all images like by user id
  async getLikedImages(req: RequestWithToken, res: Response) {
    try {
      const { user_id } = req.decoded.decoded;

      ImageModel.find({ likedBy: user_id }, (err, images) => {
        if (images) {
          res.status(200).json(images);
        } else {
          res.sendStatus(400);
        }
      }).populate("author", "-password -__v -state -userType");
    } catch (err) {
      console.error();
    }
  }

  // if user id is in likedBy array, remove it, else add it
  async handleLike(req: RequestWithToken, res: Response) {
    try {
      const { id } = req.params;
      const { user_id } = req.decoded.decoded;

      ImageModel.findById(id, (err, image) => {
        if (image) {
          if (image.likedBy.includes(user_id)) {
            image.likedBy.splice(image.likedBy.indexOf(user_id), 1);
            image.likes--;
          } else {
            image.likedBy.push(user_id);
            image.likes++;
          }

          image.save((err, updatedImage) => {
            if (updatedImage) {
              res.status(201).json(updatedImage);
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
