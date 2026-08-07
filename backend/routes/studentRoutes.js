import express from "express";

import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  uploadStudentPassport
} from "../controllers/studentController.js";

import {
  createStudentValidation,
} from "../validators/studentValidator.js";

import validate from "../middlewares/validate.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import  upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createStudentValidation,
  validate,
  createStudent
);

router.get(
    "/",
    protect,
    authorizeRoles(
        "admin",
        "student"
    ),
    getStudents
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getStudent
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateStudent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteStudent
);

router.post(
  "/:id/passport",
  protect,
  authorizeRoles("admin"),
  upload.single("passport"),
  uploadStudentPassport
);

export default router;