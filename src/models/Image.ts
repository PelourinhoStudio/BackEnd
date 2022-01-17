import { model, Schema } from "mongoose";
import { UserSchema } from "@models/User";

export let ImageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: [String],
    enum: [
      "nature",
      "wallpaper",
      "landscape",
      "architecture",
      "fashion",
      "foods & drinks",
      "experimental",
      "film",
      "people",
      "travel",
      "animals",
      "arts & culture",
      "history",
      "athletics",
    ],
    lowercase: true,
  },
  tags: { type: [String], required: true },
  price: { type: Number, required: true },
  year: { type: Date, required: true },
  imageType: { type: String, enum: ["real", "digital"] },
  imageCDN: { type: String, required: true },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  likes: { type: Number, default: 0 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

let User = model("User", UserSchema);
let ImageModel = model("Images", ImageSchema);

export default ImageModel;
