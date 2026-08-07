import express from "express";

import {
  studentReport,
  studentStatistics,
} from "../controllers/studentReportController.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Student Statistics
|--------------------------------------------------------------------------
*/

router.get(
  "/statistics",
  protect,
  authorizeRoles(
    "admin",
    "principal",
    "registrar"
  ),
  studentStatistics
);

/*
|--------------------------------------------------------------------------
| Student Report
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "principal",
    "registrar"
  ),
  studentReport
);

export default router;
