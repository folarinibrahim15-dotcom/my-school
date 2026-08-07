import express from "express";

import {
  createTimetable,
  getTimetables,
  getTimetable,
  updateTimetable,
  deleteTimetable,
  toggleTimetableStatus,
} from "../controllers/timetableController.js";

import {
  createTimetableValidation,
  updateTimetableValidation,
} from "../validators/timetableValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Timetable Routes
|--------------------------------------------------------------------------
*/

router
  .route("/")
  .get(getTimetables)
  .post(
    protect,
    authorizeRoles("admin"),
    createTimetableValidation,
    validate,
    createTimetable
  );

router
  .route("/:id")
  .get(getTimetable)
  .put(
    protect,
    authorizeRoles("admin"),
    updateTimetableValidation,
    validate,
    updateTimetable
  )
  .delete(
    protect,
    authorizeRoles("admin"),
    deleteTimetable
  );

/*
|--------------------------------------------------------------------------
| Enable / Disable Timetable
|--------------------------------------------------------------------------
*/

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleTimetableStatus
);

export default router;