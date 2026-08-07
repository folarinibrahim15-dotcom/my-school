import Timetable from "../models/Timetable.js";
import checkTimetableConflict from "../utils/checkTimetableConflict.js";

/*
|--------------------------------------------------------------------------
| Create Timetable
|--------------------------------------------------------------------------
*/

export const createTimetable = async (req, res, next) => {
  try {
const conflict = await checkTimetableConflict({
  teacher,
  classroom,
  day,
  academicSession: req.body.academicSession,
  term: req.body.term,
  startTime,
  endTime,
});

if (conflict.conflict) {
  return res.status(400).json({
    success: false,
    message: conflict.message,
  });
}


    /*
    |--------------------------------------------------------------------------
    | Teacher Conflict
    |--------------------------------------------------------------------------
    */

    const teacherConflict = await Timetable.findOne({
      teacher,
      day,
      startTime,
      endTime,
      isActive: true,
    });

    if (teacherConflict) {
      return res.status(400).json({
        success: false,
        message:
          "This teacher already has a class during this time.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Classroom Conflict
    |--------------------------------------------------------------------------
    */

    const classroomConflict = await Timetable.findOne({
      classroom,
      day,
      startTime,
      endTime,
      isActive: true,
    });

    if (classroomConflict) {
      return res.status(400).json({
        success: false,
        message:
          "This classroom is already occupied during this time.",
      });
    }

    const timetable = await Timetable.create(req.body);

    const populated = await Timetable.findById(timetable._id)
      .populate("academicLevel", "name")
      .populate("department", "name")
      .populate("subject", "name code")
      .populate("teacher", "firstName lastName");

    res.status(201).json({
      success: true,
      message: "Timetable created successfully.",
      data: populated,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Timetables (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getTimetables = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      academicLevel,
      department,
      subject,
      teacher,
      classroom,
      day,
      academicSession,
      term,
      isActive,
      search,
    } = req.query;

    const query = {};

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

    if (teacher) {
      query.teacher = teacher;
    }

    if (classroom) {
      query.classroom = {
        $regex: classroom,
        $options: "i",
      };
    }

    if (day) {
      query.day = day;
    }

    if (academicSession) {
      query.academicSession = academicSession;
    }

    if (term) {
      query.term = term;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    /*
    |--------------------------------------------------------------------------
    | Optional Search
    |--------------------------------------------------------------------------
    | Searches classroom only.
    | Subject/Teacher name searching can be added later using aggregation.
    */

    if (search) {
      query.classroom = {
        $regex: search,
        $options: "i",
      };
    }

    /*
    |--------------------------------------------------------------------------
    | Query Database
    |--------------------------------------------------------------------------
    */

    const timetables = await Timetable.find(query)
      .populate("academicLevel", "name slug")
      .populate("department", "name slug")
      .populate("subject", "name code")
      .populate("teacher", "firstName lastName email")
      .sort({
        day: 1,
        startTime: 1,
      })
      .skip(skip)
      .limit(limit);

    const total = await Timetable.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: timetables.length,
      data: timetables,
    });

  } catch (error) {
    next(error);
  }
};


/*
|--------------------------------------------------------------------------
| Get Single Timetable
|--------------------------------------------------------------------------
*/

export const getTimetable = async (req, res, next) => {
  try {

    const timetable = await Timetable.findById(req.params.id)
      .populate("academicLevel", "name")
      .populate("department", "name")
      .populate("subject", "name code")
      .populate("teacher", "firstName lastName");

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: timetable,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Timetable
|--------------------------------------------------------------------------
*/

export const updateTimetable = async (req, res, next) => {
  try {
    const conflict = await checkTimetableConflict({
  teacher: req.body.teacher,
  classroom: req.body.classroom,
  day: req.body.day,
  academicSession: req.body.academicSession,
  term: req.body.term,
  startTime: req.body.startTime,
  endTime: req.body.endTime,
  excludeId: req.params.id,
});

if (conflict.conflict) {
  return res.status(400).json({
    success: false,
    message: conflict.message,
  });
}

    const timetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("academicLevel", "name")
      .populate("department", "name")
      .populate("subject", "name code")
      .populate("teacher", "firstName lastName");

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Timetable updated successfully.",
      data: timetable,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Timetable
|--------------------------------------------------------------------------
*/

export const deleteTimetable = async (req, res, next) => {
  try {

    const timetable = await Timetable.findById(req.params.id);

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found.",
      });
    }

    await timetable.deleteOne();

    res.status(200).json({
      success: true,
      message: "Timetable deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Enable / Disable Timetable
|--------------------------------------------------------------------------
*/

export const toggleTimetableStatus = async (req, res, next) => {
  try {

    const timetable = await Timetable.findById(req.params.id);

    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found.",
      });
    }

    timetable.isActive = !timetable.isActive;

    await timetable.save();

    res.status(200).json({
      success: true,
      message: `Timetable ${
        timetable.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: timetable,
    });

  } catch (error) {
    next(error);
  }
};