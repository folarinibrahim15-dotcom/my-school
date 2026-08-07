import Teacher from "../models/Teacher.js";
import generateEmployeeId from "../utils/generateEmployeeId.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";



/*
|--------------------------------------------------------------------------
| Upload Teacher Passport
|--------------------------------------------------------------------------
*/

export const uploadTeacherPassport = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    if (teacher.passportPublicId) {
      await deleteCloudinaryImage(teacher.passportPublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "teachers/passports"
    );

    teacher.passport = result.secure_url;
    teacher.passportPublicId = result.public_id;

    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Teacher passport uploaded successfully.",
      passport: teacher.passport,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Create Teacher
|--------------------------------------------------------------------------
*/

export const createTeacher = async (req, res, next) => {
  try {

    const employeeId = await generateEmployeeId();

    const teacher = await Teacher.create({
      ...req.body,
      employeeId,
    });

    res.status(201).json({
      success: true,
      message: "Teacher created successfully.",
      data: teacher,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Teachers (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getTeachers = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const specialization = req.query.specialization || "";
    const role = req.query.role || "";
    const status = req.query.status || "";

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
          employeeId: {
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
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    if (specialization) {
      query.specialization = specialization;
    }

    if (role) {
      query.role = role;
    }

    if (status) {
      query.status = status;
    }

    /*
    |--------------------------------------------------------------------------
    | Database Query
    |--------------------------------------------------------------------------
    */

    const teachers = await Teacher.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Teacher.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: teachers.length,
      data: teachers,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Teacher
|--------------------------------------------------------------------------
*/

export const getTeacher = async (req, res, next) => {
  try {

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: teacher,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Teacher
|--------------------------------------------------------------------------
*/

export const updateTeacher = async (req, res, next) => {
  try {

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Teacher updated successfully.",
      data: teacher,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Teacher
|--------------------------------------------------------------------------
*/

export const deleteTeacher = async (req, res, next) => {
  try {

    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    await teacher.deleteOne();

    res.status(200).json({
      success: true,
      message: "Teacher deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};