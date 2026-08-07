import express from "express";

import {
    createPayment,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment,
} from "../controllers/financeController.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create Payment
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createPayment
);

/*
|--------------------------------------------------------------------------
| Get All Payments
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    protect,
    authorizeRoles("admin"),
    getPayments
);

/*
|--------------------------------------------------------------------------
| Get Single Payment
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    protect,
    authorizeRoles("admin"),
    getPayment
);

/*
|--------------------------------------------------------------------------
| Update Payment
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    updatePayment
);

/*
|--------------------------------------------------------------------------
| Delete Payment
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deletePayment
);

export default router;