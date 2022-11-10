const express = require("express");

const router = express.Router();

const { getSpecies, addSpecies } = require("../controllers/species");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router.route("/").get(verifyAccessToken, getSpecies).post(addSpecies);

module.exports = router;
