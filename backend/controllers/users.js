const usersModel = require("../database/models/users");

const createNewUser = (req, res) => {
  const { firstName, lastName, userName, age, country, email, password } =
    req.body;
  if (age < 18) {
    return res.json("you are young");
  }
  const user = new usersModel({
    firstName,
    lastName,
    userName,
    age,
    country,
    email,
    password,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Success user Added`,
        author: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        console.log(err.keyPattern);
        if (err.keyPattern?.email) {
          return res.status(409).json({
            success: false,
            message: `The email already exists`,
          });
        } else if (err.keyPattern?.userName) {
          return res.status(409).json({
            success: false,
            message: `The User Name already exists`,
          });
        }
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

module.exports = {
  createNewUser,
};
