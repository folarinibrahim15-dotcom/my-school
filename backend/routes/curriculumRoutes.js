import express from "express";

import {
  createCurriculum,
  getCurricula,
  getCurriculum,
  updateCurriculum,
  deleteCurriculum,
  uploadCurriculumDocument,
  toggleCurriculumPublish,
  toggleCurriculumStatus,
} from "../controllers/curriculumController.js";

import {
  createCurriculumValidation,
  updateCurriculumValidation,
} from "../validators/curriculumValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Curriculum Routes
|--------------------------------------------------------------------------
*/

router
  .route("/")
  .get(getCurricula)
  .post(
    protect,
    authorizeRoles("admin"),
    createCurriculumValidation,
    validate,
    createCurriculum
  );

router
  .route("/:id")
  .get(getCurriculum)
  .put(
    protect,
    authorizeRoles("admin"),
    updateCurriculumValidation,
    validate,
    updateCurriculum
  )
  .delete(
    protect,
    authorizeRoles("admin"),
    deleteCurriculum
  );

/*
|--------------------------------------------------------------------------
| Upload Curriculum Document
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/document",
  protect,
  authorizeRoles("admin"),
  upload.single("document"),
  uploadCurriculumDocument
);

/*
|--------------------------------------------------------------------------
| Publish / Unpublish Curriculum
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-publish",
  protect,
  authorizeRoles("admin"),
  toggleCurriculumPublish
);

/*
|--------------------------------------------------------------------------
| Enable / Disable Curriculum
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleCurriculumStatus
);

export default router;