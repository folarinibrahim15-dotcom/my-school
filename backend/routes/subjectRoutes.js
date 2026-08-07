import express from "express";

import {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
  toggleSubjectStatus,
} from "../controllers/subjectController.js";

import {
  createSubjectValidation,
  updateSubjectValidation,
} from "../validators/subjectValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Subject Routes
|--------------------------------------------------------------------------
*/

router
  .route("/")
  .get(getSubjects)
  .post(
    protect,
    authorizeRoles("admin"),
    createSubjectValidation,
    validate,
    createSubject
  );

router
  .route("/:id")
  .get(getSubject)
  .put(
    protect,
    authorizeRoles("admin"),
    updateSubjectValidation,
    validate,
    updateSubject
  )
  .delete(
    protect,
    authorizeRoles("admin"),
    deleteSubject
  );

/*
|--------------------------------------------------------------------------
| Enable / Disable Subject
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleSubjectStatus
);

export default router;