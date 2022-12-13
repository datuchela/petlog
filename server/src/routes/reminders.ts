import Express from "express";
import { addReminder, deleteReminder } from "../controllers/reminders";

//middleware
import verifyAccessToken from "../middleware/verifyAccessToken";

const router = Express.Router();

router.route("/").post(verifyAccessToken, addReminder);
router.route("/:reminderId").delete(verifyAccessToken, deleteReminder);

export default router;
