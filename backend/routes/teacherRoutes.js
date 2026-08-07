import express from "express";

import {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  uploadTeacherPassport,
} from "../controllers/teacherController.js";

import {
  createTeacherValidation,
} from "../validators/teacherValidator.js";

import validate from "../middlewares/validate.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create Teacher
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTeacherValidation,
  validate,
  createTeacher
);

/*
|--------------------------------------------------------------------------
| Get All Teachers
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    authorizeRoles(
        "admin",
        "teacher"
    ),
    getTeachers
);

/*
|--------------------------------------------------------------------------
| Get Single Teacher
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getTeacher
);

/*
|--------------------------------------------------------------------------
| Update Teacher
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  createTeacherValidation,
  validate,
  updateTeacher
);

/*
|--------------------------------------------------------------------------
| Delete Teacher
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTeacher
);

router.post(
  "/:id/passport",
  protect,
  authorizeRoles("admin"),
  upload.single("passport"),
  uploadTeacherPassport
);

export default router;