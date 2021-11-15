import { model, Schema } from "mongoose";

let UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  lastOnline: { type: Date },
  password: { type: String },
  token: { type: String },
  state: ["Ativo", "Inativo", "Suspenso"],
  userType: ["ADMIN", "DESIGNER", "DEFAULT"],
});

let UserModel = model("User", UserSchema);

export default UserModel;
