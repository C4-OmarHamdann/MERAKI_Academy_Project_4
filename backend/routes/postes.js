const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const {
  createNewPostes,
  getAllPostes,
  getPostesById,
  getPostesByUser,
} = require("../controllers/postes");

// Middleware
const authentication = require("../middleware/authentication");

const postesRouter = express.Router();

postesRouter.post("/", authentication, upload.single("media"), createNewPostes);
postesRouter.get("/", authentication, getAllPostes);

postesRouter.get("/search_2", getPostesById);
postesRouter.get("/search_1", getPostesByUser);
module.exports = postesRouter;
