const express = require("express");

const router = express.Router();

const { getSpecies, addSpecies } = require("../controllers/species");
const verifyToken = require("../middleware/verifyToken");

router.route("/").get(verifyToken, getSpecies).post(addSpecies);

module.exports = router;
