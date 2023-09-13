const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");
const ideaSchema = require("../validationSchemas/ideaSchema");
const validateUserInput = require("../middleware/validateUserInput");
const user = require("../middleware/user");
//create idea
router.post(
  "/",
  [auth, user],
  upload.single("image"),
  validateUserInput(ideaSchema),
  ideaController.createIdea
);
router.put("/update/:id", [auth, user], ideaController.updateIdea);
// update idea image
router.post(
  "/update/:id/image",
  [auth, user],
  upload.single("image"),
  ideaController.updateIdeaImage
);
router.get("/all/:id", ideaController.getIdeaById);
// Get all ideas corresponding to each user
router.get("/userIdea", [auth, user], ideaController.getUserIdea);
//get user idea by id
router.get("/userIdea/:id", [auth, user], ideaController.getUserIdeaById);
//send idea to back office
router.put("/sendIdea/:id", [auth, user], ideaController.sendIdea);
// get all idea of user send to back office
router.get("/sendedIdea", [auth, admin], ideaController.getSendedIdea); // [auth, admin]
//get idea sended by  id
router.get("/sendedIdea/:id", [auth, admin], ideaController.getSendedIdeaById); //[auth, admin]
//update idea to public status
router.put("/send/:id", [auth, admin], ideaController.updateSendedIdea); //[auth, admin] ///remarque
//get all published ideas
router.get("/publicIdea", ideaController.getPublichIdea);
//add discution to idea
router.get("/sended/count", [auth, admin], ideaController.getIdeaCount); //admin
router.get(
  "/sended/status/count",
  [auth, admin],
  ideaController.getIdeaCountByStatus
); //admin
// delete idea by id
router.delete("/:id", [auth, user], ideaController.deleteIdea);
router.get("/most-liked-idea", [auth, admin], ideaController.getMostLikedIdea); //admin
router.post("/:id/like", [auth, user], ideaController.likeIdea);
router.put(
  "/:id/urlDiscution",
  [auth, admin],
  ideaController.addUrlDiscutionToIdea
); //[auth, admin]

module.exports = router;
