import express from "express";
import {
  getHomepage,
  updateHomepage,
  uploadHeroSlide,
  updateHeroSlide,
  toggleHeroSlideStatus,
  reorderHeroSlides,
  addCounter,
  updateCounter,
  deleteCounter,
  addFeature,
  updateFeature,
  deleteFeature,
  deleteHeroSlide,
} from "../controllers/homepageController.js";

import {
  updateHomepageValidation,
} from "../validators/homepageValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Homepage
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getHomepage
);

router.put(
  "/",
  protect,
  authorizeRoles("admin"),
  updateHomepageValidation,
  validate,
  updateHomepage
);

/*
|--------------------------------------------------------------------------
| Hero Slider
|--------------------------------------------------------------------------
*/

router.post(
  "/hero",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadHeroSlide
);

router.put(
  "/hero/:slideId",
  protect,
  authorizeRoles("admin"),
  updateHeroSlide
);

router.patch(
  "/hero/:slideId/toggle",
  protect,
  authorizeRoles("admin"),
  toggleHeroSlideStatus
);

router.patch(
  "/hero/reorder",
  protect,
  authorizeRoles("admin"),
  reorderHeroSlides
);

/*
|--------------------------------------------------------------------------
| Homepage Counters
|--------------------------------------------------------------------------
*/

router.post(
  "/counters",
  protect,
  authorizeRoles("admin"),
  addCounter
);

router.put(
  "/counters/:counterId",
  protect,
  authorizeRoles("admin"),
  updateCounter
);

router.delete(
  "/counters/:counterId",
  protect,
  authorizeRoles("admin"),
  deleteCounter
);

/*
|--------------------------------------------------------------------------
| Why Choose Us
|--------------------------------------------------------------------------
*/

router.post(
  "/features",
  protect,
  authorizeRoles("admin"),
  addFeature
);

router.put(
  "/features/:featureId",
  protect,
  authorizeRoles("admin"),
  updateFeature
);

router.delete(
  "/features/:featureId",
  protect,
  authorizeRoles("admin"),
  deleteFeature
);

router.delete(
  "/hero/:slideId",
  protect,
  authorizeRoles("admin"),
  deleteHeroSlide
);

export default router;