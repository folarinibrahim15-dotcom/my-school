import Timetable from "../models/Timetable.js";

/*
|--------------------------------------------------------------------------
| Check Teacher / Classroom Conflict
|--------------------------------------------------------------------------
*/

const checkTimetableConflict = async ({
  teacher,
  classroom,
  day,
  academicSession,
  term,
  startTime,
  endTime,
  excludeId = null,
}) => {

  const query = {
    day,
    academicSession,
    term,
    isActive: true,
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const schedules = await Timetable.find(query);

  for (const schedule of schedules) {

    const overlap =
      startTime < schedule.endTime &&
      endTime > schedule.startTime;

    if (!overlap) continue;

    if (
      teacher &&
      schedule.teacher.toString() === teacher.toString()
    ) {
      return {
        conflict: true,
        message:
          "Teacher already has another class during this time.",
      };
    }

    if (
      classroom &&
      schedule.classroom === classroom
    ) {
      return {
        conflict: true,
        message:
          "Classroom is already occupied during this time.",
      };
    }
  }

  return {
    conflict: false,
  };
};

export default checkTimetableConflict;
