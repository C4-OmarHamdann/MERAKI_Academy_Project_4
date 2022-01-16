const express = require("express");
const { createNewUser } = require("../controllers/users");
const multer = require("multer");
const path = require("path");
// define router
const usersRouter = express.Router();
//upload avatar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });

usersRouter.post("/", upload.single("media"), createNewUser);

module.exports = usersRouter;
