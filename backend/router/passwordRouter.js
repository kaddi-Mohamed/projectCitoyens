const express = require("express");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/passwordController");
const emailSchema = require("../validationSchemas/emailSchema");
const resetPasswordSchema = require("../validationSchemas/resetPasswordSchema");
const validateUserInput = require("../middleware/validateUserInput");
const router = express.Router();
//localhost:3000/v1/password/forgot-password
router.post("/forgot-password", validateUserInput(emailSchema), forgotPassword);
router.post(
  "/reset-password",
  validateUserInput(resetPasswordSchema),
  resetPassword
);
module.exports = router;
