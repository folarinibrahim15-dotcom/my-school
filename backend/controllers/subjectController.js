import Subject from "../models/Subject.js";

/*
|--------------------------------------------------------------------------
| Create Subject
|--------------------------------------------------------------------------
*/

export const createSubject = async (req, res, next) => {
  try {

    const subject = await Subject.create(req.body);

    const populatedSubject = await Subject.findById(subject._id)
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("teacher", "firstName lastName email");

    res.status(201).json({
      success: true,
      message: "Subject created successfully.",
      data: populatedSubject,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Subjects (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getSubjects = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      academicLevel,
      department,
      teacher,
      isActive,
      isCompulsory,
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
          code: {
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

    if (teacher) {
      query.teacher = teacher;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    if (isCompulsory !== undefined) {
      query.isCompulsory = isCompulsory === "true";
    }

    const subjects = await Subject.find(query)
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("teacher", "firstName lastName email")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Subject.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: subjects.length,
      data: subjects,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Subject
|--------------------------------------------------------------------------
*/

export const getSubject = async (req, res, next) => {
  try {

    const subject = await Subject.findById(req.params.id)
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("teacher", "firstName lastName email");

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: subject,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Subject
|--------------------------------------------------------------------------
*/

export const updateSubject = async (req, res, next) => {
  try {

    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("teacher", "firstName lastName email");

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subject updated successfully.",
      data: subject,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Subject
|--------------------------------------------------------------------------
*/

export const deleteSubject = async (req, res, next) => {
  try {

    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    await subject.deleteOne();

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Subject Status
|--------------------------------------------------------------------------
*/

export const toggleSubjectStatus = async (req, res, next) => {
  try {

    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    subject.isActive = !subject.isActive;

    await subject.save();

    res.status(200).json({
      success: true,
      message: `Subject ${
        subject.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: subject,
    });

  } catch (error) {
    next(error);
  }
};