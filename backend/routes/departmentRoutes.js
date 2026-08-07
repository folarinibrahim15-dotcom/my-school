import express from "express";

import {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  uploadDepartmentImage,
  toggleDepartmentStatus,
} from "../controllers/departmentController.js";

import {
  createDepartmentValidation,
  updateDepartmentValidation,
} from "../validators/departmentValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Department Routes
|--------------------------------------------------------------------------
*/

router
  .route("/")
  .get(getDepartments)
  .post(
    protect,
    authorizeRoles("admin"),
    createDepartmentValidation,
    validate,
    createDepartment
  );

router
  .route("/:id")
  .get(getDepartment)
  .put(
    protect,
    authorizeRoles("admin"),
    updateDepartmentValidation,
    validate,
    updateDepartment
  )
  .delete(
    protect,
    authorizeRoles("admin"),
    deleteDepartment
  );

/*
|--------------------------------------------------------------------------
| Upload Department Image
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/image",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadDepartmentImage
);

/*
|--------------------------------------------------------------------------
| Enable / Disable Department
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleDepartmentStatus
);

export default router;