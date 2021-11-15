import { Request, Response } from "express";
import ImageModel from "../models/Image";

export default class ImageController {
  //Create image
  async create(req: Request, res: Response) {
    const { body } = req;

    const newImage = await new ImageModel(body);

    newImage
      .save()
      .then(() => {
        res.status(201);
        res.send(newImage);
      })
      .catch(res.status(400));
  }
  //Get all images
  async getAllImages(req: Request, res: Response) {
    const image = await ImageModel.find({});

    if (image) {
      res.status(200);
      res.send(image);
    } else {
      res.status(400);
    }
  }

  //Get one image by id
  async getImageById(req: Request, res: Response) {
    const { id } = req.params;

    const image = await ImageModel.findById(id);

    if (image) {
      res.status(200);
      res.send(image);
    } else {
      res.status(400);
    }
  }

  //Get all images of a category
  async getImagesByCategory(req: Request, res: Response) {
    const { category } = req.params;

    const images = await ImageModel.find({
      category: [category],
    });

    if (images) {
      res.status(200);
      res.send(images);
    } else {
      res.status(400);
    }
  }

  //Get images by tags
  /*
    example of body
    {
      "tags": ["something", "else", "whatever"]
    }
  */
  async getImagesByTags(req: Request, res: Response) {
    const { body } = req;

    const images = await ImageModel.find({ tags: body.tags });

    if (images) {
      res.status(200);
      res.send(images);
    } else {
      res.status(400);
    }
  }

  //Update one image by id
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

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

  //Delete one image by id
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
