import { model, Schema } from "mongoose";

let UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  lastOnline: { type: Date },
  password: { type: String, required: true },
  state: { type: String, enum: ["Ativo", "Inativo", "Suspenso"] },
  userType: {
    type: String,
    enum: ["admin", "designer", "default"],
    lowercase: true,
  },
});

let UserModel = model("User", UserSchema);

export default UserModel;
