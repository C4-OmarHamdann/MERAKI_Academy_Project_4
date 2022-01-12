const commentsModel = require("../database/models/comments");
const postesModel = require("../database/models/postes");

// This function creates a new comment for a specific post
const createNewComment = (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  const newComment = new commentsModel({
    comment,
    fileName: req.file.filename,
    mimetype: req.file.mimetype,
    commenter: req.token.userName,
  });
  newComment
    .save()
    .then((result) => {
      postesModel
        .findOneAndUpdate({ _id: postId }, { $push: { comments: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `The new comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error (post)`,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error (comment)`,
      });
    });
};

module.exports = {
  createNewComment,
};
