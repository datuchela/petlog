const express = require("express");
const router = express.Router();

//middleware
const verifyAccessToken = require("../middleware/verifyAccessToken");

const { getUser, addUser } = require("../controllers/users");

router.route("/").get(verifyAccessToken, getUser).post(addUser);

module.exports = router;
