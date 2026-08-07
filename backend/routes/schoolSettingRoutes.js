import express from "express";

import {
  getSchoolSettings,
  updateSchoolSettings,
  uploadSchoolLogo,
  uploadPrincipalPhoto,
} from "../controllers/schoolSettingController.js";

import {
  updateSchoolSettingValidation,
} from "../validators/schoolSettingValidator.js";

import validate from "../middlewares/validate.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Get Settings
|--------------------------------------------------------------------------
*/

router.get("/", getSchoolSettings);

/*
|--------------------------------------------------------------------------
| Update Settings
|--------------------------------------------------------------------------
*/

router.put(
  "/",
  protect,
  authorizeRoles("admin"),
  updateSchoolSettingValidation,
  validate,
  updateSchoolSettings
);

/*
|--------------------------------------------------------------------------
| Upload School Logo
|--------------------------------------------------------------------------
*/

router.post(
  "/logo",
  protect,
  authorizeRoles("admin"),
  upload.single("logo"),
  uploadSchoolLogo
);

/*
|--------------------------------------------------------------------------
| Upload Principal Photo
|--------------------------------------------------------------------------
*/

router.post(
  "/principal-photo",
  protect,
  authorizeRoles("admin"),
  upload.single("photo"),
  uploadPrincipalPhoto
);

export default router;