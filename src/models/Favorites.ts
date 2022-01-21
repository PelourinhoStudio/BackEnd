import { model, Schema } from "mongoose";
import { UserSchema } from "@models/User";
import { ImageSchema } from "./Image";

export let FavoriteSchema = new Schema({
    user:  { type: Schema.Types.ObjectId, ref: "User" },
    favorites:[ { type: Schema.Types.ObjectId, ref: "Images" } ],
});

let User = model("User", UserSchema);
let ImageModel = model("Images", ImageSchema);
let FavoriteModel = model("Favorite", FavoriteSchema)

export default FavoriteModel;