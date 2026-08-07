import express from "express";

import {
    createNotification,
    getNotifications,
    getSingleNotification,
    updateNotification,
    markNotificationAsRead,
    deleteNotification,
    markAllNotificationsAsRead,
    getUnreadNotificationCount,
} from "../controllers/notificationController.js";

import protect from "../middlewares/authMiddleware.js";

import { validateNotification } from "../middlewares/validateNotification.js";

import {
    authorizeRoles,
} from "../middlewares/roleMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create Notification
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    protect,
    authorizeRoles(
        "admin",
        "teacher"
    ),
    validateNotification,
    createNotification
);

/*
|--------------------------------------------------------------------------
| Logged-in User Notifications
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    getNotifications
);

/*
|--------------------------------------------------------------------------
| Notification Summary
|--------------------------------------------------------------------------
*/

/**
 * IMPORTANT:
 * These MUST come BEFORE "/:id"
 * Otherwise Express thinks
 * "unread-count" is an ObjectId.
 */

router.get(
    "/unread-count",
    protect,
    getUnreadNotificationCount
);

router.patch(
    "/read-all",
    protect,
    markAllNotificationsAsRead
);

/*
|--------------------------------------------------------------------------
| Single Notification
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    protect,
    getSingleNotification
);

/*
|--------------------------------------------------------------------------
| Update Notification
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    protect,
    authorizeRoles(
        "admin",
        "teacher"
    ),
    validateNotification,
    updateNotification
);

/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/read",
    protect,
    markNotificationAsRead
);

/*
|--------------------------------------------------------------------------
| Delete Notification
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    protect,
    deleteNotification
);

export default router;