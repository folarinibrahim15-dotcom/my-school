import express from "express";

import {

    getDashboardStats,

} from "../controllers/dashboardController.js";

import {
  dashboardAnalytics,
} from "../controllers/dashboardController.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard Analytics
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "principal",
    "accountant",
    "registrar"
  ),
  dashboardAnalytics
);

router.get(
    "/stats",
    protect,
    getDashboardStats

);


export default router;
