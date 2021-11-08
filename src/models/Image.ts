import { model, Schema } from "mongoose";

let ImageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: ["Landscape", "Wallpaper", "Nature", "Drawing"],
  tags: { type: String, required: true },
  price: { type: Number, required: true },
  year: { type: Date, required: true },
  imageType: ["real", "digital"],
  imageCDN: { type: String, required: true, unique: true },
  likes: { type: Number, required: true, default : 0 },
  dislikes: { type: Number, required: true, default : 0 }
});

let ImageModel = model("Images", ImageSchema);

export default ImageModel;
