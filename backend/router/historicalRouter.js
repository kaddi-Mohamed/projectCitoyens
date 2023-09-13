const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const historicalController = require("../controllers/HistoricalController");
const admin = require("../middleware/admin");
router.get("/:id", historicalController.getHistoricalByIdea);
router.delete(
  "/:id",
  [auth, admin],
  historicalController.DeleteHistoricalByIdea
);
module.exports = router;
