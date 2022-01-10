const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const { createNewPostes } = require("../controllers/postes");

// Middleware
const authentication = require("../middleware/authentication");

const postesRouter = express.Router();

postesRouter.post("/", authentication, upload.single("media"), createNewPostes);
module.exports = postesRouter;
