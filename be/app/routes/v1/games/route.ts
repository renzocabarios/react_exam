import { Router } from "express";
import { calculateWinner, add, get } from "./controller.js";

const router = Router();
router.route("/").get(get);
router.route("/").post(add);
router.route("/calculate").post(calculateWinner);

export default router;
