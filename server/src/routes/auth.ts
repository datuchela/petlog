import Express from "express";
import { authenticate, refreshToken, logOut } from "./../controllers/auth";

const router = Express.Router();

router.route("/").post(authenticate);
router.route("/refresh").get(refreshToken);
router.route("/logout").get(logOut);

export default router;
