import express from "express";

import {

initializePayment,

verifyPayment,

initializeSchoolFeesPayment,

getPaymentReceipt

} from "../controllers/paymentController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Initialize Payment
|--------------------------------------------------------------------------
*/

router.post(
  "/initialize",
  initializePayment
);

router.post(
  "/school-fees",
  initializeSchoolFeesPayment
);

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

router.get(
  "/verify/:reference",
  verifyPayment
);

/*
|--------------------------------------------------------------------------
| Get Payment Receipt
|--------------------------------------------------------------------------
*/

router.get(
  "/receipt/:reference",
  getPaymentReceipt
);

export default router;