import { Router } from "express";
import {
  createCourse,
  getCourses,
  deleteCourse,
} from "../controllers/course.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// Base URL: /api/courses
router.route("/create-course").post(createCourse);
router.route("/get-courses").get(getCourses);
router.route("/delete-course/:id").delete(deleteCourse);

export default router;
