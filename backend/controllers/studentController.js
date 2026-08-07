import User from "../models/User.js";
import Parent from "../models/Parent.js";
import bcrypt from "bcryptjs";

import Student from "../models/Student.js";
import generateApplicationNumber from "../utils/generateApplicationNumber.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Upload Student Passport
|--------------------------------------------------------------------------
*/

export const uploadStudentPassport = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const student = await Student.findById(req.params.id)
    .populate("parent")
    .populate("user");
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    if (student.passportPublicId) {
      await deleteCloudinaryImage(student.passportPublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "students/passports"
    );

    student.passport = result.secure_url;
    student.passportPublicId = result.public_id;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Student passport uploaded successfully.",
      passport: student.passport,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Create Student
|--------------------------------------------------------------------------
*/
export const createStudent = async (req, res, next) => {
    try {

              const {
          firstName,
          lastName,
          otherName,
          gender,
          dateOfBirth,
          class: studentClass,
          session,
          address,
          parent,
          email,
          phoneNumber,
          password,
      } = req.body;
        /*
        |--------------------------------------------------------------------------
        | Required Fields
        |--------------------------------------------------------------------------
        */

        if (

            !firstName ||
            !lastName ||
            !gender ||
            !dateOfBirth ||
            !studentClass ||
            !session ||
            !address ||
            !email ||
            !password

        ) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields.",

            });

        }

        /*
        |--------------------------------------------------------------------------
        | Generate Admission Number
        |--------------------------------------------------------------------------
        */

        const admissionNumber = await generateApplicationNumber();

        /*
        |--------------------------------------------------------------------------
        | Check Existing User
        |--------------------------------------------------------------------------
        */

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "Email already exists.",

            });

        }

        /*
        |--------------------------------------------------------------------------
        | Parent Validation
        |--------------------------------------------------------------------------
        */

        let parentId = null;

        if (parent) {

            const parentExists = await Parent.findById(parent);

            if (!parentExists) {

                return res.status(404).json({

                    success: false,

                    message: "Parent not found.",

                });

            }

            parentId = parentExists._id;

        }

        /*
        |--------------------------------------------------------------------------
        | Create User Account
        |--------------------------------------------------------------------------
        */

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({

              firstName,

              lastName,

              email,

              phoneNumber,

              password: hashedPassword,

              role: "student",

          });

        /*
        |--------------------------------------------------------------------------
        | Create Student
        |--------------------------------------------------------------------------
        */

        const student = await Student.create({

            admissionNumber,

            firstName,

            lastName,

            otherName,

            gender,

            dateOfBirth,

            class: studentClass,

            session,

            address,

            parent: parentId,

            user: user._id,

        });

        res.status(201).json({

            success: true,

            message: "Student created successfully.",

            data: student,

        });

    } catch (error) {

        next(error);

    }
};

/*
|--------------------------------------------------------------------------
| Get Students (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getStudents = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search = "",
      class: studentClass = "",
      gender = "",
      status = "",
      paymentStatus = "",
      session = "",
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
          admissionNumber: {
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

    if (studentClass) {
      query.class = studentClass;
    }

    if (gender) {
      query.gender = gender;
    }

    if (status) {
      query.admissionStatus = status;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (session) {
      query.session = session;
    }

    /*
    |--------------------------------------------------------------------------
    | Query Database
    |--------------------------------------------------------------------------
    */

    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
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
| Get Single Student
|--------------------------------------------------------------------------
*/

export const getStudent = async (req, res, next) => {
  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Student
|--------------------------------------------------------------------------
*/

export const updateStudent = async (req, res, next) => {
  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: student,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Student
|--------------------------------------------------------------------------
*/

export const deleteStudent = async (req, res, next) => {
  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};