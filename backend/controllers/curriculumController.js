import Curriculum from "../models/Curriculum.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Create Curriculum
|--------------------------------------------------------------------------
*/

export const createCurriculum = async (req, res, next) => {
  try {

    const curriculum = await Curriculum.create(req.body);

    const populatedCurriculum = await Curriculum.findById(curriculum._id)
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("subject", "name code");

    res.status(201).json({
      success: true,
      message: "Curriculum created successfully.",
      data: populatedCurriculum,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Curricula (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getCurricula = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      academicLevel,
      department,
      subject,
      academicSession,
      term,
      isPublished,
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
          slug: {
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

    if (academicLevel) {
      query.academicLevel = academicLevel;
    }

    if (department) {
      query.department = department;
    }

    if (subject) {
      query.subject = subject;
    }

    if (academicSession) {
      query.academicSession = academicSession;
    }

    if (term) {
      query.term = term;
    }

    if (isPublished !== undefined) {
      query.isPublished = isPublished === "true";
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    /*
    |--------------------------------------------------------------------------
    | Query Database
    |--------------------------------------------------------------------------
    */

    const curricula = await Curriculum.find(query)
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("subject", "name code")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Curriculum.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: curricula.length,
      data: curricula,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Curriculum
|--------------------------------------------------------------------------
*/

export const getCurriculum = async (req, res, next) => {
  try {

    const curriculum = await Curriculum.findById(req.params.id)
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("subject", "name code");

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: curriculum,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Curriculum
|--------------------------------------------------------------------------
*/

export const updateCurriculum = async (req, res, next) => {
  try {

    const curriculum = await Curriculum.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("subject", "name code");

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Curriculum updated successfully.",
      data: curriculum,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Curriculum
|--------------------------------------------------------------------------
*/

export const deleteCurriculum = async (req, res, next) => {
  try {

    const curriculum = await Curriculum.findById(req.params.id);

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum not found.",
      });
    }

    if (curriculum.documentPublicId) {
      await deleteCloudinaryImage(curriculum.documentPublicId);
    }

    await curriculum.deleteOne();

    res.status(200).json({
      success: true,
      message: "Curriculum deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Curriculum Document
|--------------------------------------------------------------------------
*/

export const uploadCurriculumDocument = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document.",
      });
    }

    const curriculum = await Curriculum.findById(req.params.id);

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum not found.",
      });
    }

    if (curriculum.documentPublicId) {
      await deleteCloudinaryImage(curriculum.documentPublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "curriculum/documents"
    );

    curriculum.document = result.secure_url;
    curriculum.documentPublicId = result.public_id;

    await curriculum.save();

    res.status(200).json({
      success: true,
      message: "Curriculum document uploaded successfully.",
      document: curriculum.document,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Publish / Unpublish Curriculum
|--------------------------------------------------------------------------
*/

export const toggleCurriculumPublish = async (req, res, next) => {
  try {

    const curriculum = await Curriculum.findById(req.params.id);

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum not found.",
      });
    }

    curriculum.isPublished = !curriculum.isPublished;

    await curriculum.save();

    res.status(200).json({
      success: true,
      message: `Curriculum ${
        curriculum.isPublished ? "published" : "unpublished"
      } successfully.`,
      data: curriculum,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Enable / Disable Curriculum
|--------------------------------------------------------------------------
*/

export const toggleCurriculumStatus = async (req, res, next) => {
  try {

    const curriculum = await Curriculum.findById(req.params.id);

    if (!curriculum) {
      return res.status(404).json({
        success: false,
        message: "Curriculum not found.",
      });
    }

    curriculum.isActive = !curriculum.isActive;

    await curriculum.save();

    res.status(200).json({
      success: true,
      message: `Curriculum ${
        curriculum.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: curriculum,
    });

  } catch (error) {
    next(error);
  }
};