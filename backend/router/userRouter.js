const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const user = require("../middleware/user");
const router = express.Router();
const userController = require("../controllers/userController");
const validateUserInput = require("../middleware/validateUserInput");
const userSchema = require("../validationSchemas/userShema");
// user registration
router.post(
  "/signUp",
  validateUserInput(userSchema),
  userController.createUser
);
// bloquer user account
router.post("/bloquer/:id", userController.bloquerUser); //  [auth, admin]
//all user
router.get("/", userController.getAllUser); //[auth, admin]
// delete user by id
router.delete("/delete/:id", userController.deleteUser); // [auth, admin]
// verification of token
router.get("/verify/:id/:token", userController.verifyToken);
// get info about current user
router.get("/me", auth, userController.currentUser);
// get number of user
router.get("/count", userController.getUserCount);
// get user by  email verifiaction
router.get("/verified/count", userController.getUserCountByVerifyEmail);
//update user profile
router.put("/updateProfile", auth, userController.updateProfile);

module.exports = router;
