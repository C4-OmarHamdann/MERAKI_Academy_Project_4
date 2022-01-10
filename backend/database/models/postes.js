const mongoose = require("mongoose");

const postes = new mongoose.Schema({
  userName: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  poste: { type: String, required: true },
  like: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Postes", postes);
