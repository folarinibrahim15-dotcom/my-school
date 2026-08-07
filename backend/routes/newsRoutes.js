import express from "express";

import {
  createNews,
  getNews,
  getSingleNews,
  updateNews,
  deleteNews,
  uploadFeaturedImage,
} from "../controllers/newsController.js";

import {
  createNewsValidation,
} from "../validators/newsValidator.js";

import validate from "../middlewares/validate.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create News
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createNewsValidation,
  validate,
  createNews
);

/*
|--------------------------------------------------------------------------
| Get All News
|--------------------------------------------------------------------------
*/

router.get("/", getNews);

/*
|--------------------------------------------------------------------------
| Get Single News
|--------------------------------------------------------------------------
*/

router.get("/:id", getSingleNews);

/*
|--------------------------------------------------------------------------
| Update News
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateNews
);

/*
|--------------------------------------------------------------------------
| Delete News
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteNews
);

/*
|--------------------------------------------------------------------------
| Upload Featured Image
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/image",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadFeaturedImage
);

export default router;