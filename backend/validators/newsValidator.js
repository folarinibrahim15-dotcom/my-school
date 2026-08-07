import { body } from "express-validator";

export const createNewsValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required."),

  body("slug")
    .notEmpty()
    .withMessage("Slug is required."),

  body("content")
    .notEmpty()
    .withMessage("Content is required."),

  body("category")
    .optional()
    .isIn([
      "News",
      "Announcement",
      "Event",
      "Achievement",
    ])
    .withMessage("Invalid category."),
];