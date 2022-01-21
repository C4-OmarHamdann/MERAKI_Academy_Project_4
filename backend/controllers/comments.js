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
    avatar: req.token?.avatar,
  });
  newComment
    .save()
    .then((result) => {
      postesModel
        .updateOne({ _id: postId }, { $push: { comments: result._id } })
        .then(() => {
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

// This function deletes a specific commenter by its id
const deleteCommentById = (req, res) => {
  const id = req.params.id;

  const _id = req.query.post;

  commentsModel

    .findByIdAndDelete(id)

    .then((result) => {
      //delete comment in array
      postesModel
        .updateOne({ _id }, { $pull: { comments: { $in: id } } })
        .then((postTest) => {})
        .catch((err) => {});
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The comment: ${id} is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `Succeeded to delete comment with id: ${id}`,
      });
    })
    .catch((err) => {
      console.log("error : " + err);
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};
module.exports = {
  createNewComment,
  updateCommentById,
  deleteCommentById,
};
