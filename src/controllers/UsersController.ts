

import UserModel from "../models/User"


  export async function create(values) {
    let newUser = await new UserModel(values);

    return save(newUser);
  }

  function save(newUser) {
    return new Promise((resolve, reject) => {
      newUser.save((err) => {
        if (err) reject(err);

        resolve("User created");
      });
    });
  }

   function findAll() {
    return new Promise((resolve, reject) => {
      UserModel.find({}, (err, users) => {
        if (err) reject(err);

        resolve(users);
      });
    });
  }


