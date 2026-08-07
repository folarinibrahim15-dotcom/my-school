import AcademicLevel from "../models/AcademicLevel.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Create Academic Level
|--------------------------------------------------------------------------
*/

export const createAcademicLevel = async (req, res, next) => {
  try {

    const level = await AcademicLevel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Academic level created successfully.",
      data: level,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get All Academic Levels
|--------------------------------------------------------------------------
*/

export const getAcademicLevels = async (req, res, next) => {
  try {

    const levels = await AcademicLevel.find()
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: levels.length,
      data: levels,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Academic Level
|--------------------------------------------------------------------------
*/

export const getAcademicLevel = async (req, res, next) => {
  try {

    const level = await AcademicLevel.findById(req.params.id);

    if (!level) {
      return res.status(404).json({
        success: false,
        message: "Academic level not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: level,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Academic Level
|--------------------------------------------------------------------------
*/

export const updateAcademicLevel = async (req, res, next) => {
  try {

    const level = await AcademicLevel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!level) {
      return res.status(404).json({
        success: false,
        message: "Academic level not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Academic level updated successfully.",
      data: level,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Academic Level
|--------------------------------------------------------------------------
*/

export const deleteAcademicLevel = async (req, res, next) => {
  try {

    const level = await AcademicLevel.findById(req.params.id);

    if (!level) {
      return res.status(404).json({
        success: false,
        message: "Academic level not found.",
      });
    }

    if (level.imagePublicId) {
      await deleteCloudinaryImage(level.imagePublicId);
    }

    await level.deleteOne();

    res.status(200).json({
      success: true,
      message: "Academic level deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Academic Level Image
|--------------------------------------------------------------------------
*/

export const uploadAcademicLevelImage = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const level = await AcademicLevel.findById(req.params.id);

    if (!level) {
      return res.status(404).json({
        success: false,
        message: "Academic level not found.",
      });
    }

    if (level.imagePublicId) {
      await deleteCloudinaryImage(level.imagePublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "academic-levels"
    );

    level.image = result.secure_url;
    level.imagePublicId = result.public_id;

    await level.save();

    res.status(200).json({
      success: true,
      message: "Academic level image uploaded successfully.",
      image: level.image,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Academic Level Status
|--------------------------------------------------------------------------
*/

export const toggleAcademicLevelStatus = async (req, res, next) => {
  try {

    const level = await AcademicLevel.findById(req.params.id);

    if (!level) {
      return res.status(404).json({
        success: false,
        message: "Academic level not found.",
      });
    }

    level.isActive = !level.isActive;

    await level.save();

    res.status(200).json({
      success: true,
      message: `Academic level ${
        level.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: level,
    });

  } catch (error) {
    next(error);
  }
};