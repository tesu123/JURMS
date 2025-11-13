import { Router } from "express";
import {
  addDepartment,
  getDepartments,
  deleteDepartment,
} from "../controllers/department.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// // Base URL: /api/departments
// router.route("/add-department").post(addDepartment);
// router.route("/get-departments").get(getDepartments);
// router.route("/delete-department/:id").delete(deleteDepartment);
import { authorizeRoles } from "../middlewares/role.middleware.js";

router.route("/add-department")
    .post(verifyJWT, authorizeRoles("admin"), addDepartment);

router.route("/get-departments")
    .get(verifyJWT, getDepartments);

router.route("/delete-department/:id")
    .delete(verifyJWT, authorizeRoles("admin"), deleteDepartment);

export default router;
