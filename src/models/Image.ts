import { model, Schema } from "mongoose";

let ImageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: [String],
    enum: ["Landscape", "Wallpaper", "Nature", "Drawing"],
    lowercase: true,
  },
  tags: { type: String, required: true },
  price: { type: Number, required: true },
  year: { type: Date, required: true },
  imageType: { type: String, enum: ["real", "digital"] },
  imageCDN: { type: String, required: true, unique: true },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
});

let ImageModel = model("Images", ImageSchema);

export default ImageModel;
