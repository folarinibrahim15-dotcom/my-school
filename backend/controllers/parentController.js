import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";
import Parent from "../models/Parent.js";

/*
|--------------------------------------------------------------------------
| Upload Parent Profile Photo
|--------------------------------------------------------------------------
*/

export const uploadParentProfilePhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found.",
      });
    }

    if (parent.profilePhotoPublicId) {
      await deleteCloudinaryImage(parent.profilePhotoPublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "parents/profile-photos"
    );

    parent.profilePhoto = result.secure_url;
    parent.profilePhotoPublicId = result.public_id;

    await parent.save();

    res.status(200).json({
      success: true,
      message: "Parent profile photo uploaded successfully.",
      profilePhoto: parent.profilePhoto,
    });

  } catch (error) {
    next(error);
  }
};
/*
|--------------------------------------------------------------------------
| Create Parent
|--------------------------------------------------------------------------
*/

export const createParent = async (req, res, next) => {
  try {

    const parent = await Parent.create(req.body);

    res.status(201).json({
      success: true,
      message: "Parent created successfully.",
      data: parent,
    });

  } catch (error) {
    next(error);
  }
};


/*
|--------------------------------------------------------------------------
| Get Parents (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getParents = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const relationship = req.query.relationship || "";

    const gender = req.query.gender || "";

    const occupation = req.query.occupation || "";

    const isActive = req.query.isActive;

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
          email: {
            $regex: search,
            $options: "i",
          },
        },

        {
          phoneNumber: {
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

    if (relationship) {
      query.relationship = relationship;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    /*
    |--------------------------------------------------------------------------
    | Database Query
    |--------------------------------------------------------------------------
    */

    const parents = await Parent.find(query)
      .populate("students", "firstName lastName admissionNumber class")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Parent.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: parents.length,
      data: parents,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Parent
|--------------------------------------------------------------------------
*/

export const getParent = async (req, res, next) => {
  try {

    const parent = await Parent.findById(req.params.id)
      .populate("students");

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: parent,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Parent
|--------------------------------------------------------------------------
*/

export const updateParent = async (req, res, next) => {
  try {

    const parent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Parent updated successfully.",
      data: parent,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Parent
|--------------------------------------------------------------------------
*/

export const deleteParent = async (req, res, next) => {
  try {

    const parent = await Parent.findById(req.params.id);

    if (!parent) {
      return res.status(404).json({
        success: false,
        message: "Parent not found.",
      });
    }

    await parent.deleteOne();

    res.status(200).json({
      success: true,
      message: "Parent deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};