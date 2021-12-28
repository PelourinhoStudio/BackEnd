import { Request, Response } from "express";
import ImageModel from "../models/Image";

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
      }).populate("author");
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
      }).populate("author");
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
      ).populate("author");
    } catch (err) {
      console.error();
    }
  }



  async getCategories(req: Request, res: Response){
    try {
      ImageModel.distinct("category" , (err, categories) => {
        if (categories) {
          res.status(200).json(categories);
        } else {
          res.sendStatus(400);
        }
      }).populate("author");
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
      }).populate("author");
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
}
