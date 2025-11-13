import { Router } from "express";
import {
  addRoutine,
  getRoutines,
  deleteRoutine,
} from "../controllers/routine.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// // Base URL: /api/v1/routines
// router.route("/add-routine").post(addRoutine);
// router.route("/get-routines").get(getRoutines);
// router.route("/delete-routine/:id").delete(deleteRoutine);


router.route("/add-routine")
    .post(verifyJWT, authorizeRoles("admin"), addRoutine);

router.route("/get-routines")
    .get(verifyJWT, getRoutines);   // all can view

router.route("/delete-routine/:id")
    .delete(verifyJWT, authorizeRoles("admin"), deleteRoutine);

export default router;
