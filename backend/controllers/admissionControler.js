import Admission from "../models/Admission.js";
import generateAdmissionCode from "../utils/generateAdmissionCode.js";
import generateApplicationNumber from "../utils/generateApplicationNumber.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";
import { sendApplicationConfirmation } from "../services/emailService.js";


/*
|--------------------------------------------------------------------------
| Upload Admission Document
|--------------------------------------------------------------------------
*/

export const uploadAdmissionDocument = async (
  req,
  res,
  next
) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document.",
      });
    }

    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    const result = await uploadToCloudinary(
      req.file,
      "admissions/documents"
    );

    admission.documents.push({
      name: req.file.originalname,
      url: result.secure_url,
      publicId: result.public_id,
      uploadedAt: new Date(),
    });

    await admission.save();

    res.status(200).json({
      success: true,
      message: "Admission document uploaded successfully.",
      document: result.secure_url,
      documents: admission.documents,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Create Admission
|--------------------------------------------------------------------------
*/

export const createAdmission = async (req, res, next) => {

  try {

    const applicationNumber =
      await generateApplicationNumber();


    console.log(
      "Generated Application Number:",
      applicationNumber
    );


    const admission = await Admission.create({

      ...req.body,

      applicationNumber,

    });



    /*
    |--------------------------------------------------------------------------
    | Send Confirmation Email
    |--------------------------------------------------------------------------
    */

    try {

      await sendApplicationConfirmation({

        name: `${admission.firstName} ${admission.lastName}`,

        email: admission.parentEmail,

        applicationNumber: admission.applicationNumber,

      });


      console.log(
        "✅ Admission confirmation email sent"
      );


    } catch (emailError) {


      console.error(
        "❌ Admission Email Error:",
        emailError.message
      );


    }



    res.status(201).json({

      success: true,

      message:
        "Admission application submitted successfully.",

      data: admission,

    });



  } catch (error) {


    console.error(
      "❌ Admission Creation Error:",
      error.message
    );


    next(error);

  }

};


/*
|--------------------------------------------------------------------------
| Get Admissions (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getAdmissions = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const status = req.query.status || "";
    const classApplyingFor = req.query.classApplyingFor || "";

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
          parentEmail: {
            $regex: search,
            $options: "i",
          },
        },

        {
          applicationNumber: {
            $regex: search,
            $options: "i",
          },
        },

        {
          admissionCode: {
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

    if (status) {
      query.status = status;
    }

    if (classApplyingFor) {
      query.classApplyingFor = classApplyingFor;
    }

    /*
    |--------------------------------------------------------------------------
    | Database Query
    |--------------------------------------------------------------------------
    */

    const admissions = await Admission.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Admission.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: admissions.length,
      data: admissions,
    });

  } catch (error) {
    next(error);
  }
};


/*
|--------------------------------------------------------------------------
| Get Single Admission
|--------------------------------------------------------------------------
*/

export const getAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: admission,
    });

  } catch (error) {
    next(error);
  }
};


/*
|--------------------------------------------------------------------------
| Update Admission
|--------------------------------------------------------------------------
*/

export const updateAdmission = async (req, res, next) => {

    try {

        const admission = await Admission.findById(req.params.id);

        if (!admission) {
            return res.status(404).json({
                success: false,
                message: "Admission not found.",
            });
        }

        const editableFields = [

            "firstName",
            "lastName",
            "middleName",

            "gender",
            "dateOfBirth",

            "hometown",
            "lga",
            "stateOfOrigin",

            "religion",
            "denomination",

            "classApplyingFor",

            "previousSchool",
            "previousSchoolAddress",
            "reasonForLeaving",

            "parentName",
            "parentEmail",
            "parentPhone",

            "allergies",
            "childrenEnrolled",

            "status",
            "remarks",

        ];

        editableFields.forEach((field) => {

            if (req.body[field] !== undefined) {
                admission[field] = req.body[field];
            }

        });

        await admission.save();

        res.status(200).json({
            success: true,
            message: "Admission updated successfully.",
            data: admission,
        });

    } catch (error) {

        next(error);

    }

};

/*
|--------------------------------------------------------------------------
| Delete Admission
|--------------------------------------------------------------------------
*/

export const deleteAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    await admission.deleteOne();

    res.status(200).json({
      success: true,
      message: "Admission deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};