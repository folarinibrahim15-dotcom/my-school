import express from "express";

import {
  createFeeStructure,
  getFeeStructures,
  getFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
  toggleFeeStructureStatus,
  getActiveFeeStructures,
} from "../controllers/feeStructureController.js";

import {
  createFeeStructureValidation,
  updateFeeStructureValidation,
} from "../validators/feeStructureValidator.js";

import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getFeeStructures);

router.get("/active", getActiveFeeStructures);

router.get("/:id", getFeeStructure);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createFeeStructureValidation,
  validate,
  createFeeStructure
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateFeeStructureValidation,
  validate,
  updateFeeStructure
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteFeeStructure
);

router.patch(
  "/:id/toggle-status",
  protect,
  authorizeRoles("admin"),
  toggleFeeStructureStatus
);

export default router;
