export function UserService(UserModel) {
  let service = {
    create,
    findAll,
  };

  function create(values) {
    let newUser = UserModel(values);
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

  return service;
}
