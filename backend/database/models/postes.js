const mongoose = require("mongoose");

const postes = new mongoose.Schema({
  userName: { type: mongoose.Schema.Types.String, ref: "User" },
  poste: { type: String, required: true },
  fileName: { type: String },
  mimetype: { type: String },
  like: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  name: { type: String },
  avatar: { type: String },
});

module.exports = mongoose.model("Postes", postes);
