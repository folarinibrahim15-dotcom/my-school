import { body } from "express-validator";

/*
|--------------------------------------------------------------------------
| Shared Enums
|--------------------------------------------------------------------------
*/

const paymentMethods = [
  "Cash",
  "Bank Transfer",
  "POS",
  "Cheque",
  "Paystack",
  "Flutterwave",
];

const paymentStatuses = [
  "Pending",
  "Successful",
  "Failed",
];

/*
|--------------------------------------------------------------------------
| Create Payment Validation
|--------------------------------------------------------------------------
*/

export const createPaymentValidation = [

  body("invoice")
    .notEmpty()
    .withMessage("Invoice is required.")
    .isMongoId()
    .withMessage("Invalid invoice ID."),

  body("student")
    .notEmpty()
    .withMessage("Student is required.")
    .isMongoId()
    .withMessage("Invalid student ID."),

  body("paymentReference")
    .trim()
    .notEmpty()
    .withMessage("Payment reference is required."),

  body("amount")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than zero."),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required.")
    .isIn(paymentMethods)
    .withMessage("Invalid payment method."),

  body("paymentDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Payment date must be a valid date."),

  body("transactionId")
    .optional()
    .trim(),

  body("receivedBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid receivedBy user ID."),

  body("remarks")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn(paymentStatuses)
    .withMessage("Invalid payment status."),

  body("isVerified")
    .optional()
    .isBoolean()
    .withMessage("isVerified must be true or false."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false."),
];

/*
|--------------------------------------------------------------------------
| Update Payment Validation
|--------------------------------------------------------------------------
*/
export const updatePaymentValidation = [

  body("invoice")
    .optional()
    .isMongoId()
    .withMessage("Invalid invoice ID."),

  body("student")
    .optional()
    .isMongoId()
    .withMessage("Invalid student ID."),

  body("paymentReference")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Payment reference cannot be empty."),

  body("amount")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be greater than zero."),

  body("paymentMethod")
    .optional()
    .isIn([
      "Cash",
      "Bank Transfer",
      "POS",
      "Cheque",
      "Paystack",
      "Flutterwave",
    ])
    .withMessage("Invalid payment method."),

  body("paymentDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid payment date."),

  body("transactionId")
    .optional()
    .trim(),

  body("receivedBy")
    .optional()
    .isMongoId()
    .withMessage("Invalid user ID."),

  body("remarks")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn([
      "Pending",
      "Successful",
      "Failed",
    ])
    .withMessage("Invalid payment status."),

  body("isVerified")
    .optional()
    .isBoolean(),

  body("isActive")
    .optional()
    .isBoolean(),

];