import Student from "../models/Student.js";

/*
|--------------------------------------------------------------------------
| Student Report
|--------------------------------------------------------------------------
*/

export const studentReport = async (req, res, next) => {
  try {

    const {
      className,
      gender,
      status,
      admissionYear,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    if (className) {
      query.class = className;
    }

    if (gender) {
      query.gender = gender;
    }

    if (status) {
      query.status = status;
    }

    if (admissionYear) {
      query.admissionYear = Number(admissionYear);
    }

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
          admissionNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const students = await Student.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit));

    const total = await Student.countDocuments(query);

    res.status(200).json({

      success: true,

      total,

      page: Number(page),

      pages: Math.ceil(total / limit),

      count: students.length,

      data: students,

    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Student Statistics
|--------------------------------------------------------------------------
*/

export const studentStatistics = async (req, res, next) => {
  try {

    const totalStudents =
      await Student.countDocuments();

    const activeStudents =
      await Student.countDocuments({
        status: "Active",
      });

    const inactiveStudents =
      await Student.countDocuments({
        status: "Inactive",
      });

    const maleStudents =
      await Student.countDocuments({
        gender: "Male",
      });

    const femaleStudents =
      await Student.countDocuments({
        gender: "Female",
      });

    res.status(200).json({

      success: true,

      data: {

        totalStudents,

        activeStudents,

        inactiveStudents,

        maleStudents,

        femaleStudents,

      },

    });

  } catch (error) {
    next(error);
  }
};
