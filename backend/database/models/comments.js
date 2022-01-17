const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  fileName: { type: String },
  mimetype: { type: String },
  commenter: { type: mongoose.Schema.Types.String, ref: "User" },
  avatar: { type: mongoose.Schema.Types.String, ref: "User" },
});

module.exports = mongoose.model("Comment", commentSchema);
