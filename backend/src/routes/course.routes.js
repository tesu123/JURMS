// import { Router } from "express";
// import {
//   createCourse,
//   getCourses,
//   deleteCourse,
// } from "../controllers/course.controller.js";

// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { authorizeRoles } from "../middlewares/role.middleware.js";
// const router = Router();

// // // Base URL: /api/courses
// // router.route("/create-course").post(createCourse);
// // router.route("/get-courses").get(getCourses);
// // router.route("/delete-course/:id").delete(deleteCourse);

// router.route("/create-course")
//     .post(verifyJWT, authorizeRoles("admin"), createCourse);

// router.route("/get-courses")
//     .get(verifyJWT, getCourses);

// router.route("/delete-course/:id")
//     .delete(verifyJWT, authorizeRoles("admin"), deleteCourse);

// export default router;

import { Router } from "express";
import {
  createCourse,
  getCourses,
  deleteCourse,
} from "../controllers/course.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

// BASE URL → /api/v1/courses

router
  .route("/create-course")
  .post(verifyJWT, authorizeRoles("admin"), createCourse);

router.route("/get-courses").get(verifyJWT, getCourses);

router
  .route("/delete-course/:id")
  .delete(verifyJWT, authorizeRoles("admin"), deleteCourse);

export default router;
