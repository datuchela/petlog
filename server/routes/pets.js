const express = require("express");
const router = express.Router();

//middleware
const verifyAccessToken = require("../middleware/verifyAccessToken");

const { getPet, addPet, deletePet, getPets } = require("../controllers/pets");

router.route("/").get(verifyAccessToken, getPets);
router
  .route("/:petId")
  .get(verifyAccessToken, getPet)
  .delete(verifyAccessToken, deletePet);
router.route("/").post(verifyAccessToken, addPet);

module.exports = router;
