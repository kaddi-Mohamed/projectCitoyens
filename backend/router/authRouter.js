const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateUserInput = require("../middleware/validateUserInput");
const loginSchema = require("../validationSchemas/loginSchema");
router.post("/login", validateUserInput(loginSchema), authController.authUser);
module.exports = router;
