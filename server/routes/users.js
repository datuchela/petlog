const express = require("express");
const router = express.Router();

//middleware
const verifyToken = require("../middleware/verifyToken");

const { getUser, addUser } = require("../controllers/users");

router.route("/").get(verifyToken, getUser).post(addUser);

module.exports = router;
