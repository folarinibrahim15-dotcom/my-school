import express from "express";

import {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
  uploadTestimonialPhoto,
  toggleTestimonialFeatured,
  toggleTestimonialStatus,
} from "../controllers/testimonialController.js";

import {
  createTestimonialValidation,
  updateTestimonialValidation,
} from "../validators/testimonialValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getTestimonials);

router.get("/:id", getTestimonial);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTestimonialValidation,
  validate,
  createTestimonial
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateTestimonialValidation,
  validate,
  updateTestimonial
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTestimonial
);

/*
|--------------------------------------------------------------------------
| Upload Photo
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/photo",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadTestimonialPhoto
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
  toggleTestimonialFeatured
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
  toggleTestimonialStatus
);

export default router;
