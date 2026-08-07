import express from "express";

import {
  createStudentInvoice,
  getStudentInvoices,
  getStudentInvoice,
  updateStudentInvoice,
  deleteStudentInvoice,
  toggleStudentInvoiceStatus,
  getOutstandingInvoices,
  generateInvoice,
} from "../controllers/studentInvoiceController.js";

import {
  createStudentInvoiceValidation,
  updateStudentInvoiceValidation,
} from "../validators/studentInvoiceValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getStudentInvoices);

router.get("/outstanding", getOutstandingInvoices);

router.get("/:id", getStudentInvoice);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createStudentInvoiceValidation,
  validate,
  createStudentInvoice
);

router.post(
  "/generate",
  protect,
  authorizeRoles("admin"),
  generateInvoice
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateStudentInvoiceValidation,
  validate,
  updateStudentInvoice
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteStudentInvoice
);

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleStudentInvoiceStatus
);

export default router;
