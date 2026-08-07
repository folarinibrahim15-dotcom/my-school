import Gallery from "../models/Gallery.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Upload Gallery Image
|--------------------------------------------------------------------------
*/

export const uploadGalleryImage = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const result = await uploadToCloudinary(
      req.file,
      "gallery"
    );

    const gallery = await Gallery.create({
      title: req.body.title,
      description: req.body.description || "",
      category: req.body.category || "School",
      image: result.secure_url,
      imagePublicId: result.public_id,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully.",
      data: gallery,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Gallery
|--------------------------------------------------------------------------
*/

export const getGallery = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    const category = req.query.category || "";

    const query = {};

    if (category) {
      query.category = category;
    }

    const gallery = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Gallery.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: gallery,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Gallery Item
|--------------------------------------------------------------------------
*/

export const getGalleryItem = async (req, res, next) => {
  try {

    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Gallery
|--------------------------------------------------------------------------
*/

export const updateGallery = async (req, res, next) => {
  try {

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully.",
      data: gallery,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Gallery
|--------------------------------------------------------------------------
*/

export const deleteGallery = async (req, res, next) => {
  try {

    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    if (gallery.imagePublicId) {
      await deleteCloudinaryImage(gallery.imagePublicId);
    }

    await gallery.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};