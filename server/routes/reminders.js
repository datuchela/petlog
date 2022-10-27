const express = require("express");
const router = express.Router();

//middleware
const verifyToken = require("../middleware/verifyToken");

const { addReminder, deleteReminder } = require("../controllers/reminders");

router.route("/").post(verifyToken, addReminder);
router.route("/:reminderId").delete(verifyToken, deleteReminder);

module.exports = router;
