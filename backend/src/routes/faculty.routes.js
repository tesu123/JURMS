import { Router } from "express";
import {
  addFaculty,
  getFaculties,
  deleteFaculty,
} from "../controllers/faculty.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// Base URL: /api/faculties
router.route("/add-faculty").post(addFaculty);
router.route("/get-faculties").get(getFaculties);
router.route("/delete-faculty/:id").delete(deleteFaculty);

export default router;
