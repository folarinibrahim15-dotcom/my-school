import express from "express";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

import {
    dashboardReport,
    studentReport,
    admissionReport,
    financeReport,
    academicReport,
    paymentReport
} from "../controllers/reportController.js";


const router = express.Router();



// =====================================
// Dashboard Summary Report
// GET /api/reports/dashboard
// Admin only
// =====================================
router.get(
    "/dashboard",
    protect,
    authorizeRoles("admin"),
    dashboardReport
);



// =====================================
// Student Analytics Report
// GET /api/reports/students
// Admin only
// =====================================
router.get(
    "/students",
    protect,
    authorizeRoles("admin"),
    studentReport
);



// =====================================
// Admission Analytics Report
// GET /api/reports/admissions
// Admin only
// =====================================
router.get(
    "/admissions",
    protect,
    authorizeRoles("admin"),
    admissionReport
);



// =====================================
// Finance Analytics Report
// GET /api/reports/finance
// Admin only
// =====================================
router.get(
    "/finance",
    protect,
    authorizeRoles("admin"),
    financeReport
);



// =====================================
// Academic Analytics Report
// GET /api/reports/academic
// Admin only
// =====================================
router.get(
    "/academic",
    protect,
    authorizeRoles("admin"),
    academicReport
);


// Payment Transactions
// GET /api/reports/payments

router.get(
    "/payments",
    protect,
    authorizeRoles("admin"),
    paymentReport
);

export default router;