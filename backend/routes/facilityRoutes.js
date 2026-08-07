import express from "express";

import {
  createFacility,
  getFacilities,
  getFacility,
  updateFacility,
  deleteFacility,
  uploadFacilityImage,
  toggleFacilityFeatured,
  toggleFacilityStatus,
} from "../controllers/facilityController.js";

import {
  createFacilityValidation,
  updateFacilityValidation,
} from "../validators/facilityValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Facilities Routes
|--------------------------------------------------------------------------
*/

router
  .route("/")
  .get(getFacilities)
  .post(
    protect,
    authorizeRoles("admin"),
    createFacilityValidation,
    validate,
    createFacility
  );

router
  .route("/:id")
  .get(getFacility)
  .put(
    protect,
    authorizeRoles("admin"),
    updateFacilityValidation,
    validate,
    updateFacility
  )
  .delete(
    protect,
    authorizeRoles("admin"),
    deleteFacility
  );

/*
|--------------------------------------------------------------------------
| Upload Facility Image
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/image",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadFacilityImage
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
  toggleFacilityFeatured
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
  toggleFacilityStatus
);

export default router;
