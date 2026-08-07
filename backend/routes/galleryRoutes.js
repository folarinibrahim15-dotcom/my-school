import express from "express";

import {
  uploadGalleryImage,
  getGallery,
  getGalleryItem,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

import {
  createGalleryValidation,
} from "../validators/galleryValidator.js";

import validate from "../middlewares/validate.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Upload Gallery Image
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  createGalleryValidation,
  validate,
  uploadGalleryImage
);

/*
|--------------------------------------------------------------------------
| Get Gallery
|--------------------------------------------------------------------------
*/

router.get("/", getGallery);

/*
|--------------------------------------------------------------------------
| Get Single Gallery Item
|--------------------------------------------------------------------------
*/

router.get("/:id", getGalleryItem);

/*
|--------------------------------------------------------------------------
| Update Gallery
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateGallery
);

/*
|--------------------------------------------------------------------------
| Delete Gallery
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteGallery
);

export default router;