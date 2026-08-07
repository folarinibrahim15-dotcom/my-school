import { body } from "express-validator";

export const createGalleryValidation = [

  body("title")
    .notEmpty()
    .withMessage("Title is required."),

  body("category")
    .optional()
    .isIn([
      "School",
      "Sports",
      "Events",
      "Graduation",
      "Academics",
      "Others",
    ])
    .withMessage("Invalid gallery category."),

];