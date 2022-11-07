const express = require("express");
const router = express.Router();

//middleware
const verifyAccessToken = require("../middleware/verifyAccessToken");

const { addReminder, deleteReminder } = require("../controllers/reminders");

router.route("/").post(verifyAccessToken, addReminder);
router.route("/:reminderId").delete(verifyAccessToken, deleteReminder);

module.exports = router;
