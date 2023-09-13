const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const user = require("../middleware/user");
const commentSchema = require("../validationSchemas/commentSchema");
const validateUserInput = require("../middleware/validateUserInput");

router.post(
  "/:id",
  [auth, user],
  validateUserInput(commentSchema),
  commentController.addComment
);
// update comment by id
router.put(
  "/:id",
  [auth, user],
  validateUserInput(commentSchema),
  commentController.updateComment
);
//delete comment by id
router.delete("/:id", [auth, user], commentController.DeleteComment);
router.post("/:id/like", [auth, user], commentController.likeComment);
router.get("/count", [auth, admin], commentController.getCommentCount);
router.get("/idea/:id", commentController.getCommentByIdea);
router.get("/:id/likes", commentController.getCommentLikes);
router.get("/:id", commentController.getCommentById);
module.exports = router;
