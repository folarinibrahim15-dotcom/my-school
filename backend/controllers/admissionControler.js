import Admission from "../models/Admission.js";
import generateApplicationNumber from "../utils/generateApplicationNumber.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";
import { sendApplicationConfirmation } from "../services/emailService.js";

const PASSPORT_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

/*
|--------------------------------------------------------------------------
| Parse Document Options
|--------------------------------------------------------------------------
*/

const parseDocumentOptions = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

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

    const admission = await Admission.findById(
      req.params.id
    );

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

    return res.status(200).json({
      success: true,
      message: "Admission document uploaded successfully.",
      document: result.secure_url,
      documents: admission.documents,
    });
  } catch (error) {
    return next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Create Admission
|--------------------------------------------------------------------------
*/

export const createAdmission = async (
  req,
  res,
  next
) => {
  let uploadedPassportPublicId = null;

  try {
    /*
     * Passport photo is optional, but if provided,
     * only accepted image formats are allowed.
     */
    if (req.file) {
      if (
        !PASSPORT_MIME_TYPES.includes(req.file.mimetype)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Passport must be a JPG, PNG, or WEBP image.",
        });
      }

      if (req.file.size > MAX_FILE_SIZE) {
        return res.status(400).json({
          success: false,
          message:
            "Passport photograph must not exceed 5MB.",
        });
      }
    }

    /*
     * Multer places text fields in req.body.
     * documentOptions arrives as a JSON string when
     * sent through multipart FormData.
     */
    const {
      documentOptions: rawDocumentOptions,
      ...formFields
    } = req.body;

    const documentOptions = parseDocumentOptions(
      rawDocumentOptions
    );

    const allowedDocumentOptions = [
      "testimonial",
      "results",
      "emailLater",
    ];

    const invalidOptions = documentOptions.filter(
      (option) =>
        !allowedDocumentOptions.includes(option)
    );

    if (invalidOptions.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid document option provided.",
      });
    }

    /*
     * Upload passport to Cloudinary before creating
     * the admission record.
     */
    let passportPhoto = {
      url: "",
      publicId: "",
      name: "",
      uploadedAt: null,
    };

    if (req.file) {
      const uploadResult = await uploadToCloudinary(
        req.file,
        "admissions/passports"
      );

      if (
        !uploadResult?.secure_url ||
        !uploadResult?.public_id
      ) {
        throw new Error(
          "Cloudinary did not return the passport URL and public ID."
        );
      }

      uploadedPassportPublicId =
        uploadResult.public_id;

      passportPhoto = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        name: req.file.originalname,
        uploadedAt: new Date(),
      };
    }

    /*
     * Generate the unique application number.
     */
    const applicationNumber =
      await generateApplicationNumber();

    console.log(
      "Generated Application Number:",
      applicationNumber
    );

    /*
     * Create admission using fields supported by
     * the Admission model.
     */
    const admission = await Admission.create({
      ...formFields,

      applicationNumber,

      passportPhoto,

      testimonialSubmitted:
        documentOptions.includes("testimonial"),

      resultsSubmitted:
        documentOptions.includes("results"),

      emailDocumentsLater:
        documentOptions.includes("emailLater"),
    });

    /*
     * Confirmation email failure should not undo
     * a successfully saved application.
     */
    try {
      await sendApplicationConfirmation({
        name: `${admission.firstName} ${admission.lastName}`,
        email: admission.parentEmail,
        applicationNumber:
          admission.applicationNumber,
      });

      console.log(
        "Admission confirmation email sent."
      );
    } catch (emailError) {
      console.error(
        "Admission confirmation email error:",
        emailError.message
      );
    }

    return res.status(201).json({
      success: true,
      message:
        "Admission application submitted successfully.",
      data: admission,
    });
  } catch (error) {
    /*
     * If the passport uploaded successfully but admission
     * creation failed, attempt to remove the orphaned image.
     */
    if (uploadedPassportPublicId) {
      try {
        await deleteCloudinaryImage(
          uploadedPassportPublicId
        );
      } catch (cleanupError) {
        console.error(
          "Failed to remove unused passport image:",
          cleanupError.message
        );
      }
    }

    console.error(
      "Admission creation error:",
      error.message
    );

    return next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Admissions
|--------------------------------------------------------------------------
*/

export const getAdmissions = async (
  req,
  res,
  next
) => {
  try {
    const page = Math.max(
      1,
      Number.parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        Number.parseInt(req.query.limit, 10) || 10
      )
    );

    const {
      search = "",
      status = "",
      classApplyingFor = "",
    } = req.query;

    const query = {};

    if (search.trim()) {
      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const searchRegex = new RegExp(
        escapedSearch,
        "i"
      );

      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { parentEmail: searchRegex },
        { applicationNumber: searchRegex },
        { admissionCode: searchRegex },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (classApplyingFor) {
      query.classApplyingFor = classApplyingFor;
    }

    const skip = (page - 1) * limit;

    const [admissions, total] = await Promise.all([
      Admission.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Admission.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: admissions.length,
      data: admissions,
    });
  } catch (error) {
    return next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Admission
|--------------------------------------------------------------------------
*/

export const getAdmission = async (
  req,
  res,
  next
) => {
  try {
    const admission = await Admission.findById(
      req.params.id
    );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: admission,
    });
  } catch (error) {
    return next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Admission
|--------------------------------------------------------------------------
*/

export const updateAdmission = async (
  req,
  res,
  next
) => {
  try {
    const admission = await Admission.findById(
      req.params.id
    );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    /*
     * Only update fields explicitly allowed here.
     * Do not allow a normal update request to overwrite
     * applicationNumber, payment, or passport metadata.
     */
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

    return res.status(200).json({
      success: true,
      message: "Admission updated successfully.",
      data: admission,
    });
  } catch (error) {
    return next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Admission
|--------------------------------------------------------------------------
*/

export const deleteAdmission = async (
  req,
  res,
  next
) => {
  try {
    const admission = await Admission.findById(
      req.params.id
    );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found.",
      });
    }

    await admission.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Admission deleted successfully.",
    });
  } catch (error) {
    return next(error);
  }
};