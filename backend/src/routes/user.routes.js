import { Router } from "express";

import {
  registerUser,
  verifyOTP,
  resendOTP,
  loginUser,
  forgotPassword,
  verifyForgotPasswordOTP,
  resendForgotPasswordOTP,
  resetPassword,
  logoutUser,
  getCurrentUser,
  updateAccountsDetails,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/verify-otp").post(verifyOTP);
router.route("/resend-otp").post(resendOTP);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-forgot-password-otp").post(verifyForgotPasswordOTP);
router.route("/resend-forgot-password-otp").post(resendForgotPasswordOTP);
router.route("/reset-password").post(resetPassword);
router.route("/logout").post(verifyJWT, logoutUser);

// router.route("/current-user").get(verifyJWT, getCurrentUser);

// router.route("/update-user-details").post(verifyJWT, updateAccountsDetails);

router
  .route("/update-user-details")
  .post(verifyJWT, authorizeRoles("admin"), updateAccountsDetails);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/get-users").get(verifyJWT, authorizeRoles("admin"), getAllUsers);

router
  .route("/users/:userId")
  .delete(verifyJWT, authorizeRoles("admin"), deleteUser);

export default router;
