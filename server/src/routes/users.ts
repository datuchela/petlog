import Express from "express";
import { getUser, addUser } from "../controllers/users";

//middleware
import verifyAccessToken from "../middleware/verifyAccessToken";

const router = Express.Router();

router.route("/").get(verifyAccessToken, getUser).post(addUser);

export default router;
