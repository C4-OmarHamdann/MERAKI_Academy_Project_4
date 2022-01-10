const express = require("express");

const { createNewPostes } = require("../controllers/postes");

// Middleware
const authentication = require("../middleware/authentication");

const postesRouter = express.Router();

postesRouter.post("/", authentication, createNewPostes);
module.exports = postesRouter;
