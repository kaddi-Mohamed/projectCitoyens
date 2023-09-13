const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const user = require("../middleware/user");

const LikeController = require("../controllers/likeController");

router.get("/idea/:id", [auth, user], LikeController.checkLikeIdeaByUser);
router.get("/comment/:id", [auth, user], LikeController.checkLikeCommentByUser);
module.exports = router;
