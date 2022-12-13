import Express from "express";
import { getPet, addPet, deletePet, getPets } from "../controllers/pets";

//middleware
import verifyAccessToken from "../middleware/verifyAccessToken";

const router = Express.Router();

router.route("/").get(verifyAccessToken, getPets);
router.route("/:petId").get(verifyAccessToken, getPet).delete(verifyAccessToken, deletePet);
router.route("/").post(verifyAccessToken, addPet);

export default router;
