import Teacher from "../models/Teacher.js";

const generateEmployeeId = async () => {
  const year = new Date().getFullYear();

  const count = await Teacher.countDocuments();

  const serial = String(count + 1).padStart(5, "0");

  return `SPIS/TCH/${year}/${serial}`;
};

export default generateEmployeeId;