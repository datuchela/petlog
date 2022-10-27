const express = require("express");
const router = express.Router();

//middleware
//

const { authenticate, refreshToken, logOut } = require("../controllers/auth");

router.route("/").post(authenticate);
router.route("/refresh").get(refreshToken);
router.route("/logout").get(logOut);

module.exports = router;
