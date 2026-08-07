import express from "express";

import {
  createReceipt,
  getReceipts,
  getReceipt,
  updateReceipt,
  deleteReceipt,
  generateReceipt,
  markReceiptPrinted,
  markReceiptEmailed,
  toggleReceiptStatus,
  receiptStatistics,
  downloadReceiptPDF,
  emailReceipt,
} from "../controllers/receiptController.js";

import {
  createReceiptValidation,
  updateReceiptValidation,
} from "../validators/receiptValidator.js";

import validate from "../middlewares/validate.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Receipt CRUD
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  authorizeRoles("admin", "accountant"),
  getReceipts
);

router.get(
  "/statistics",
  protect,
  authorizeRoles("admin", "accountant"),
  receiptStatistics
);

router.get(
  "/:id/pdf",
  protect,
  authorizeRoles("admin", "accountant"),
  downloadReceiptPDF
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "accountant"),
  getReceipt
);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "accountant"),
  createReceipt
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "accountant"),
  updateReceipt
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteReceipt
);

/*
|--------------------------------------------------------------------------
| Receipt Operations
|--------------------------------------------------------------------------
*/

router.post(
  "/generate/:paymentId",
  protect,
  authorizeRoles("admin", "accountant"),
  generateReceipt
);

router.patch(
  "/:id/printed",
  protect,
  authorizeRoles("admin", "accountant"),
  markReceiptPrinted
);

router.patch(
  "/:id/emailed",
  protect,
  authorizeRoles("admin", "accountant"),
  markReceiptEmailed
);

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleReceiptStatus
);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "accountant"),
  createReceiptValidation,
  validate,
  createReceipt
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "accountant"),
  updateReceiptValidation,
  validate,
  updateReceipt
);

router.post(
  "/:id/email",
  protect,
  authorizeRoles("admin", "accountant"),
  emailReceipt
);

export default router;
