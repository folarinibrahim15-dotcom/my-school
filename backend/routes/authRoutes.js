import express from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    getCurrentUser,
    forgotPassword,
    resetPassword
} from "../controllers/authController.js";

import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator.js";

import protect from "../middlewares/authMiddleware.js";

import validate from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);

router.post(
"/forgot-password",
forgotPassword
);


router.put(
"/reset-password/:token",
resetPassword
);

router.get(
    "/me",
    protect,
    getCurrentUser
);

export default router;