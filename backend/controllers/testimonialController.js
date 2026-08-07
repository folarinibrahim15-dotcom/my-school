import Testimonial from "../models/Testimonial.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Create Testimonial
|--------------------------------------------------------------------------
*/

export const createTestimonial = async (req, res, next) => {
  try {

    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully.",
      data: testimonial,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Testimonials (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getTestimonials = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      role,
      rating,
      isFeatured,
      isActive,
    } = req.query;

    const query = {};

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          message: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    if (role) {
      query.role = role;
    }

    if (rating) {
      query.rating = Number(rating);
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const testimonials = await Testimonial.find(query)
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Testimonial.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: testimonials.length,
      data: testimonials,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Testimonial
|--------------------------------------------------------------------------
*/

export const getTestimonial = async (req, res, next) => {
  try {

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Testimonial
|--------------------------------------------------------------------------
*/

export const updateTestimonial = async (req, res, next) => {
  try {

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully.",
      data: testimonial,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Testimonial
|--------------------------------------------------------------------------
*/

export const deleteTestimonial = async (req, res, next) => {
  try {

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    if (testimonial.photoPublicId) {
      await deleteCloudinaryImage(
        testimonial.photoPublicId
      );
    }

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Testimonial Photo
|--------------------------------------------------------------------------
*/

export const uploadTestimonialPhoto = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a photo.",
      });
    }

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    if (testimonial.photoPublicId) {
      await deleteCloudinaryImage(testimonial.photoPublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "testimonials/photos"
    );

    testimonial.photo = result.secure_url;
    testimonial.photoPublicId = result.public_id;

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Testimonial photo uploaded successfully.",
      photo: testimonial.photo,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Featured Testimonial
|--------------------------------------------------------------------------
*/

export const toggleTestimonialFeatured = async (req, res, next) => {
  try {

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    testimonial.isFeatured = !testimonial.isFeatured;

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: `Testimonial ${
        testimonial.isFeatured
          ? "featured"
          : "removed from featured"
      } successfully.`,
      data: testimonial,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Enable / Disable Testimonial
|--------------------------------------------------------------------------
*/

export const toggleTestimonialStatus = async (req, res, next) => {
  try {

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    testimonial.isActive = !testimonial.isActive;

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: `Testimonial ${
        testimonial.isActive
          ? "enabled"
          : "disabled"
      } successfully.`,
      data: testimonial,
    });

  } catch (error) {
    next(error);
  }
};
