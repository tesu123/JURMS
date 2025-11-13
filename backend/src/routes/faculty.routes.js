import { Router } from "express";
import {
  addFaculty,
  getFaculties,
  deleteFaculty,
} from "../controllers/faculty.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

import { authorizeRoles } from "../middlewares/role.middleware.js";

// // Base URL: /api/faculties
// router.route("/add-faculty").post(addFaculty);
// router.route("/get-faculties").get(getFaculties);
// router.route("/delete-faculty/:id").delete(deleteFaculty);

router
  .route("/add-faculty")
  .post(verifyJWT, authorizeRoles("admin"), addFaculty);

router.route("/get-faculties").get(verifyJWT, getFaculties);

router
  .route("/delete-faculty/:id")
  .delete(verifyJWT, authorizeRoles("admin"), deleteFaculty);

export default router;
