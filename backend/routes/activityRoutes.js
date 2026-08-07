import express from "express";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

import {
    getActivities,
} from "../controllers/activityController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard Activity Timeline
|--------------------------------------------------------------------------
*/

router.get(

    "/",

    protect,

    authorizeRoles(
        "admin",
        "principal",
        "vice principal",
        "teacher"
    ),

    getActivities

);

export default router;