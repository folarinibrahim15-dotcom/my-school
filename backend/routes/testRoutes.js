import express from "express";
import ApiError from "../utils/ApiError.js";

const router = express.Router();

router.get("/error", (req, res, next) => {
  next(new ApiError(400, "This is a test error."));
});

export default router;