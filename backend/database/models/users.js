const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("User", userSchema);
