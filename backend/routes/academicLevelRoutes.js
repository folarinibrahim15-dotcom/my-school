import express from "express";

import {
  createAcademicLevel,
  getAcademicLevels,
  getAcademicLevel,
  updateAcademicLevel,
  deleteAcademicLevel,
  uploadAcademicLevelImage,
  toggleAcademicLevelStatus,
} from "../controllers/academicLevelController.js";

import {
  createAcademicLevelValidation,
  updateAcademicLevelValidation,
} from "../validators/academicLevelValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Academic Levels
|--------------------------------------------------------------------------
*/

router
  .route("/")
  .get(getAcademicLevels)
  .post(
    protect,
    authorizeRoles("admin"),
    createAcademicLevelValidation,
    validate,
    createAcademicLevel
  );

router
  .route("/:id")
  .get(getAcademicLevel)
  .put(
    protect,
    authorizeRoles("admin"),
    updateAcademicLevelValidation,
    validate,
    updateAcademicLevel
  )
  .delete(
    protect,
    authorizeRoles("admin"),
    deleteAcademicLevel
  );

/*
|--------------------------------------------------------------------------
| Upload Academic Level Image
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/image",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadAcademicLevelImage
);

/*
|--------------------------------------------------------------------------
| Enable / Disable Academic Level
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleAcademicLevelStatus
);

export default router;