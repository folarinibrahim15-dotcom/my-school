import express from "express";

import {
    createAdmission,
    getAdmissions,
    getAdmission,
    updateAdmission,
    deleteAdmission,
    uploadAdmissionDocument,
} from "../controllers/admissionControler.js";

import { createAdmissionValidation } from "../validators/admissionValidator.js";

import validate from "../middlewares/validate.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Route
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  createAdmissionValidation,
  validate,
  createAdmission
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAdmissions
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getAdmission
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateAdmission
);

// router.patch(
//   "/:id/status",
//   protect,
//   authorizeRoles("admin"),
//   updateAdmissionStatus
// );

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteAdmission
);

router.post(
  "/:id/document",
  protect,
  authorizeRoles("admin"),
  upload.single("document"),
  uploadAdmissionDocument
);

export default router;