import Facility from "../models/Facility.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Create Facility
|--------------------------------------------------------------------------
*/

export const createFacility = async (req, res, next) => {
  try {

    const facility = await Facility.create(req.body);

    res.status(201).json({
      success: true,
      message: "Facility created successfully.",
      data: facility,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Facilities (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getFacilities = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      category,
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
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
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

    if (category) {
      query.category = category;
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const facilities = await Facility.find(query)
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Facility.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: facilities.length,
      data: facilities,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Facility
|--------------------------------------------------------------------------
*/

export const getFacility = async (req, res, next) => {
  try {

    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: facility,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Facility
|--------------------------------------------------------------------------
*/

export const updateFacility = async (req, res, next) => {
  try {

    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Facility updated successfully.",
      data: facility,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Facility
|--------------------------------------------------------------------------
*/

export const deleteFacility = async (req, res, next) => {
  try {

    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    if (facility.imagePublicId) {
      await deleteCloudinaryImage(
        facility.imagePublicId
      );
    }

    await facility.deleteOne();

    res.status(200).json({
      success: true,
      message: "Facility deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Facility Image
|--------------------------------------------------------------------------
*/

export const uploadFacilityImage = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    if (facility.imagePublicId) {
      await deleteCloudinaryImage(facility.imagePublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "facilities/images"
    );

    facility.image = result.secure_url;
    facility.imagePublicId = result.public_id;

    await facility.save();

    res.status(200).json({
      success: true,
      message: "Facility image uploaded successfully.",
      image: facility.image,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Featured Facility
|--------------------------------------------------------------------------
*/

export const toggleFacilityFeatured = async (req, res, next) => {
  try {

    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    facility.isFeatured = !facility.isFeatured;

    await facility.save();

    res.status(200).json({
      success: true,
      message: `Facility ${
        facility.isFeatured ? "featured" : "removed from featured"
      } successfully.`,
      data: facility,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Enable / Disable Facility
|--------------------------------------------------------------------------
*/

export const toggleFacilityStatus = async (req, res, next) => {
  try {

    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Facility not found.",
      });
    }

    facility.isActive = !facility.isActive;

    await facility.save();

    res.status(200).json({
      success: true,
      message: `Facility ${
        facility.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: facility,
    });

  } catch (error) {
    next(error);
  }
};
