const postesModel = require("../database/models/postes");

//get all postes

//create new poste
const createNewPostes = (req, res) => {
  const { poste } = req.body;
  const newPostes = new postesModel({
    poste: poste,
    userName: req.token.userName,
  });

  newPostes
    .save()
    .then((value) => {
      res.status(201).json({
        success: true,
        message: `poste created`,
        poste: value,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

module.exports = {
  createNewPostes,
};
