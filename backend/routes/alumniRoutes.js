import express from "express";

import {
  createAlumni,
  getAlumni,
  getSingleAlumni,
  updateAlumni,
  deleteAlumni,
  uploadAlumniProfileImage,
  toggleAlumniFeatured,
  toggleAlumniStatus,
} from "../controllers/alumniController.js";

import {
  createAlumniValidation,
  updateAlumniValidation,
} from "../validators/alumniValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Alumni Routes
|--------------------------------------------------------------------------
*/

router
  .route("/")
  .get(getAlumni)
  .post(
    protect,
    authorizeRoles("admin"),
    createAlumniValidation,
    validate,
    createAlumni
  );

router
  .route("/:id")
  .get(getSingleAlumni)
  .put(
    protect,
    authorizeRoles("admin"),
    updateAlumniValidation,
    validate,
    updateAlumni
  )
  .delete(
    protect,
    authorizeRoles("admin"),
    deleteAlumni
  );

/*
|--------------------------------------------------------------------------
| Upload Profile Image
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/profile-image",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadAlumniProfileImage
);

/*
|--------------------------------------------------------------------------
| Toggle Featured
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-featured",
  protect,
  authorizeRoles("admin"),
  toggleAlumniFeatured
);

/*
|--------------------------------------------------------------------------
| Toggle Status
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleAlumniStatus
);

export default router;
