import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    /*
    |--------------------------------------------------------------------------
    | Student Information
    |--------------------------------------------------------------------------
    */

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
      default: "",
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    hometown: {
      type: String,
      required: true,
      trim: true,
    },

    lga: {
      type: String,
      required: true,
      trim: true,
    },

    stateOfOrigin: {
      type: String,
      required: true,
      trim: true,
    },

    religion: {
      type: String,
      default: "",
      trim: true,
    },

    denomination: {
      type: String,
      default: "",
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Admission Details
    |--------------------------------------------------------------------------
    */

    classApplyingFor: {
      type: String,
      required: true,
      trim: true,
    },

    previousSchool: {
      type: String,
      required: true,
      trim: true,
    },

    previousSchoolAddress: {
      type: String,
      required: true,
      trim: true,
    },

    reasonForLeaving: {
      type: String,
      required: true,
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Parent / Guardian
    |--------------------------------------------------------------------------
    */

    parentName: {
      type: String,
      required: true,
      trim: true,
    },

    parentEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    parentPhone: {
      type: String,
      required: true,
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | Medical Information
    |--------------------------------------------------------------------------
    */

    allergies: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },

    childrenEnrolled: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },

    /*
    |--------------------------------------------------------------------------
    | Required Documents
    |--------------------------------------------------------------------------
    */

    testimonialSubmitted: {
      type: Boolean,
      default: false,
    },

    resultsSubmitted: {
      type: Boolean,
      default: false,
    },

    emailDocumentsLater: {
      type: Boolean,
      default: false,
    },

    documents: [
      {
        name: {
          type: String,
          default: "",
        },

        url: {
          type: String,
          default: "",
        },

        publicId: {
          type: String,
          default: "",
        },

        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /*
    |--------------------------------------------------------------------------
    | Admission Workflow
    |--------------------------------------------------------------------------
    */

    applicationNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    admissionCode: {
      type: String,
      unique: true,
      sparse: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Approved",
        "Rejected",
        "Admitted",
      ],
      default: "Pending",
    },

    remarks: {
      type: String,
      default: "",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },

    /*
    |--------------------------------------------------------------------------
    | Student Record (After Admission)
    |--------------------------------------------------------------------------
    */

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admission", admissionSchema);