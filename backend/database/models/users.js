const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  userName: { type: String, required: true, unique: true },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fileName: { type: String },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);
