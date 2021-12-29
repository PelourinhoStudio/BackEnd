import { model, Schema } from "mongoose";
import { UserSchema } from "@models/User";

let ImageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: [String],
    enum: ["landscape", "wallpaper", "nature", "drawing"],
    lowercase: true,
  },
  tags: { type: [String], required: true },
  price: { type: Number, required: true },
  year: { type: Date, required: true },
  imageType: { type: String, enum: ["real", "digital"] },
  imageCDN: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

let User = model("User", UserSchema);
let ImageModel = model("Images", ImageSchema);

export default ImageModel;
