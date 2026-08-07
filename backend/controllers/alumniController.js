import Alumni from "../models/Alumni.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Create Alumni
|--------------------------------------------------------------------------
*/

export const createAlumni = async (req, res, next) => {
  try {

    const alumni = await Alumni.create(req.body);

    res.status(201).json({
      success: true,
      message: "Alumni created successfully.",
      data: alumni,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Alumni (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getAlumni = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      graduationYear,
      occupation,
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
          firstName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
        {
          occupation: {
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

    if (graduationYear) {
      query.graduationYear = graduationYear;
    }

    if (occupation) {
      query.occupation = {
        $regex: occupation,
        $options: "i",
      };
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const alumni = await Alumni.find(query)
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Alumni.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: alumni.length,
      data: alumni,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Alumni
|--------------------------------------------------------------------------
*/

export const getSingleAlumni = async (req, res, next) => {
  try {

    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: alumni,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Alumni
|--------------------------------------------------------------------------
*/

export const updateAlumni = async (req, res, next) => {
  try {

    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Alumni updated successfully.",
      data: alumni,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Alumni
|--------------------------------------------------------------------------
*/

export const deleteAlumni = async (req, res, next) => {
  try {

    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found.",
      });
    }

    if (alumni.profileImagePublicId) {
      await deleteCloudinaryImage(
        alumni.profileImagePublicId
      );
    }

    await alumni.deleteOne();

    res.status(200).json({
      success: true,
      message: "Alumni deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Alumni Profile Image
|--------------------------------------------------------------------------
*/

export const uploadAlumniProfileImage = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found.",
      });
    }

    if (alumni.profileImagePublicId) {
      await deleteCloudinaryImage(
        alumni.profileImagePublicId
      );
    }

    const result = await uploadToCloudinary(
      req.file,
      "alumni/profile-images"
    );

    alumni.profileImage = result.secure_url;
    alumni.profileImagePublicId = result.public_id;

    await alumni.save();

    res.status(200).json({
      success: true,
      message: "Alumni profile image uploaded successfully.",
      profileImage: alumni.profileImage,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Featured Alumni
|--------------------------------------------------------------------------
*/

export const toggleAlumniFeatured = async (req, res, next) => {
  try {

    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found.",
      });
    }

    alumni.isFeatured = !alumni.isFeatured;

    await alumni.save();

    res.status(200).json({
      success: true,
      message: `Alumni ${
        alumni.isFeatured
          ? "featured"
          : "removed from featured"
      } successfully.`,
      data: alumni,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Enable / Disable Alumni
|--------------------------------------------------------------------------
*/

export const toggleAlumniStatus = async (req, res, next) => {
  try {

    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: "Alumni not found.",
      });
    }

    alumni.isActive = !alumni.isActive;

    await alumni.save();

    res.status(200).json({
      success: true,
      message: `Alumni ${
        alumni.isActive
          ? "enabled"
          : "disabled"
      } successfully.`,
      data: alumni,
    });

  } catch (error) {
    next(error);
  }
};
