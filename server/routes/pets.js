const express = require("express");
const router = express.Router();

//middleware
const verifyToken = require("../middleware/verifyToken");

const { getPet, addPet, deletePet, getPets } = require("../controllers/pets");

router.route("/").get(verifyToken, getPets);
router.route("/:petId").get(verifyToken, getPet).delete(verifyToken, deletePet);
router.route("/").post(verifyToken, addPet);

module.exports = router;
