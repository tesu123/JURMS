import { Router } from "express";
import {
  addRoutine,
  getRoutines,
  deleteRoutine,
} from "../controllers/routine.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Base URL: /api/v1/routines
router.route("/add-routine").post(addRoutine);
router.route("/get-routines").get(getRoutines);
router.route("/delete-routine/:id").delete(deleteRoutine);

export default router;
