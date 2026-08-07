import express from "express";

import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  uploadEventBanner,
  toggleEventFeatured,
  toggleEventStatus,
  getUpcomingEvents,
  getPastEvents,
} from "../controllers/eventController.js";

import {
  createEventValidation,
  updateEventValidation,
} from "../validators/eventValidator.js";

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

router.get("/", getEvents);

router.get("/upcoming", getUpcomingEvents);

router.get("/past", getPastEvents);

router.get("/:id", getEvent);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createEventValidation,
  validate,
  createEvent
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateEventValidation,
  validate,
  updateEvent
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteEvent
);

/*
|--------------------------------------------------------------------------
| Upload Banner
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/banner",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadEventBanner
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
  toggleEventFeatured
);

/*
|--------------------------------------------------------------------------
| Toggle Active Status
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleEventStatus
);

export default router;
