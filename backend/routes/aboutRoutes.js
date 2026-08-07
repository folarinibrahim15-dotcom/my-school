import express from "express";
import {
  getAbout,
  updateAbout,
  uploadPrincipalImage,
  uploadHistoryImage,
  deleteHistoryImage,
  addCoreValue,
  updateCoreValue,
  deleteCoreValue,
} from "../controllers/aboutController.js";

import {
  updateAboutValidation,
} from "../validators/aboutValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| About Page
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getAbout
);

router.put(
  "/",
  protect,
  authorizeRoles("admin"),
  updateAboutValidation,
  validate,
  updateAbout
);

/*
|--------------------------------------------------------------------------
| Principal Image
|--------------------------------------------------------------------------
*/

router.post(
  "/principal-image",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadPrincipalImage
);

/*
|--------------------------------------------------------------------------
| History Images
|--------------------------------------------------------------------------
*/

router.post(
  "/history-images",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadHistoryImage
);

router.delete(
  "/history-images/:imageId",
  protect,
  authorizeRoles("admin"),
  deleteHistoryImage
);

/*
|--------------------------------------------------------------------------
| Core Values
|--------------------------------------------------------------------------
*/

router.post(
  "/core-values",
  protect,
  authorizeRoles("admin"),
  addCoreValue
);

router.put(
  "/core-values/:valueId",
  protect,
  authorizeRoles("admin"),
  updateCoreValue
);

router.delete(
  "/core-values/:valueId",
  protect,
  authorizeRoles("admin"),
  deleteCoreValue
);

export default router;