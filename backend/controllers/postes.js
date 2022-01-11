const postesModel = require("../database/models/postes");

//get all postes

const getAllPostes = (req, res) => {
  const userId = req.token.userId;
  const userName = req.token.userName;
  postesModel
    .find({})
    .then((postes) => {
      if (postes.length) {
        res.status(200).json({
          success: true,
          message: `All the postes`,
          userId: userId,
          userName: userName,
          postes: postes,
          comments: postes.comments,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Postes Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};

//create new poste
const createNewPostes = (req, res) => {
  const { poste } = req.body;
  console.log(req.file);
  const newPostes = new postesModel({
    poste: poste,
    fileName: req.file.filename + "." + req.file.mimetype.split("/")[1],
    mimetype: req.file.mimetype,
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

//get poste by id
// This function returns postes by its userName
const getPostesById = (req, res) => {
  let id = req.query.id;
  postesModel
    .findById(id)

    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The postes not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The postes ${id} `,
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
module.exports = {
  createNewPostes,
  getAllPostes,
  getPostesById,
};
