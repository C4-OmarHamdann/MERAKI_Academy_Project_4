const express = require("express");
const multer = require("multer");
const {
  createNewComment,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comments");

const upload = multer({ dest: "uploads/" });

const {
  createNewPostes,
  getAllPostes,
  getPostesById,
  getPostesByUser,
  deleteposteById,
  updatePostById,
} = require("../controllers/postes");

// Middleware
const authentication = require("../middleware/authentication");

const postesRouter = express.Router();

postesRouter.post("/", authentication, upload.single("media"), createNewPostes);
postesRouter.get("/", authentication, getAllPostes);

postesRouter.get("/search_2", getPostesById);
postesRouter.get("/search_1", getPostesByUser);
postesRouter.delete("/:id", deleteposteById);
postesRouter.put("/:id", updatePostById);
////comments
postesRouter.post(
  "/:poste_id/comments",
  authentication,
  upload.single("media"),
  createNewComment
);

postesRouter.put("/comments/:id", authentication, updateCommentById);
postesRouter.delete("/comments/:id", authentication, deleteCommentById);
module.exports = postesRouter;
