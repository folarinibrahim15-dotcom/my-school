import { body } from "express-validator";

export const updateHomepageValidation = [

  body("welcomeTitle")
    .optional()
    .isString(),

  body("welcomeMessage")
    .optional()
    .isString(),

  body("principalMessage")
    .optional()
    .isString(),

  body("callToActionTitle")
    .optional()
    .isString(),

  body("callToActionText")
    .optional()
    .isString(),

];