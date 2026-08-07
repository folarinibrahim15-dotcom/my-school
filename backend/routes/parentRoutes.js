import express from "express";

import {
  createParent,
  getParents,
  getParent,
  updateParent,
  deleteParent,
  uploadParentProfilePhoto,
} from "../controllers/parentController.js";

import {
  createParentValidation,
} from "../validators/parentValidator.js";

import validate from "../middlewares/validate.js";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import upload from "../middlewares/upload.js";


const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createParentValidation,
  validate,
  createParent
);

router.get(
    "/",
    protect,
    authorizeRoles(
        "admin",
        "parent"
    ),
    getParents
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getParent
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  createParentValidation,
  validate,
  updateParent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteParent
);

router.post(
  "/:id/profile-photo",
  protect,
  authorizeRoles("admin"),
  upload.single("passport"),
  uploadParentProfilePhoto
);

export default router;