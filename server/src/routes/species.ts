import Express from "express";
import { getSpecies, addSpecies } from "../controllers/species";

//middleware
import verifyAccessToken from "../middleware/verifyAccessToken";

const router = Express.Router();

router.route("/").get(verifyAccessToken, getSpecies).post(addSpecies);

export default router;
