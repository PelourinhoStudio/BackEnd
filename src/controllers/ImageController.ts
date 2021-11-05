import { Request, Response } from "express";
import ImageModel from "../models/Image";

export default class ImageController {
  async create(req: Request, res: Response) {
    const body = req.body;

    const newImage = await new ImageModel(body);

    newImage
      .save()
      .then(() => {
        res.status(201);
        res.send(newImage);
      })
      .catch(res.status(400));
  }

  async getAllImages(req: Request, res: Response) {
    const image = await ImageModel.find({});

    if (image) {
      res.status(200);
      res.send(image);
    } else {
      res.status(400);
    }
  }

  async getImageById(req: Request, res: Response) {
    const {id} = req.params;

    const image = await ImageModel.findById(id);

    if (image) {
      res.status(200);
      res.send(image);
    } else {
      res.status(400);
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;

    const updateImage = await ImageModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (updateImage) {
      res.status(201);
      res.send(updateImage);
    } else {
      res.status(400);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteImage = await ImageModel.findByIdAndRemove(id);

    if (deleteImage) {
      res.status(200);
      res.send(deleteImage);
    } else {
      res.status(400);
    }
  }
}
