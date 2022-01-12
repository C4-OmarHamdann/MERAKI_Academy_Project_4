const commentsModel = require("../database/models/comments");
const postesModel = require("../database/models/postes");

// This function creates a new comment for a specific post
const createNewComment = (req, res) => {
  const postId = req.params.poste_id;
  const { comment } = req.body;
  const newComment = new commentsModel({
    comment,
    fileName: req?.file?.filename,
    mimetype: req?.file?.mimetype,
    commenter: req.token.userName,
  });
  newComment
    .save()
    .then((result) => {
      console.log(result);
      postesModel
        .updateOne({ _id: postId }, { $push: { comments: result._id } })
        .then(() => {
          console.log("in update");
          res.status(201).json({
            success: true,
            message: `The new comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: `Server Error (post)`,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: `Server Error (comment)`,
      });
    });
};
//This function update a comment
const updateCommentById = (req, res) => {
  const id = req.params.id;

  commentsModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(202).json({
        success: true,
        message: `comment updated`,
        newComment: result,
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
  createNewComment,
  updateCommentById,
};
