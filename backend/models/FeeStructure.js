import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    academicSession: {
      type: String,
      required: true,
      trim: true,
    },

    term: {
      type: String,
      enum: [
        "First Term",
        "Second Term",
        "Third Term",
      ],
      required: true,
    },

    classLevel: {
      type: String,
      enum: [
        "Creche",
        "Nursery 1",
        "Nursery 2",
        "Kindergarten",
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
        "JSS 1",
        "JSS 2",
        "JSS 3",
        "SS 1",
        "SS 2",
        "SS 3",
      ],
      required: true,
    },

    tuitionFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    developmentFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    examinationFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    sportsFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    libraryFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    laboratoryFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    boardingFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    transportFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    miscellaneousFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    paymentDeadline: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Auto Calculate Total Fee
|--------------------------------------------------------------------------
*/

feeStructureSchema.pre("save", function (next) {
  this.totalFee =
    this.tuitionFee +
    this.developmentFee +
    this.examinationFee +
    this.sportsFee +
    this.libraryFee +
    this.laboratoryFee +
    this.boardingFee +
    this.transportFee +
    this.miscellaneousFee;
});

const FeeStructure = mongoose.model(
  "FeeStructure",
  feeStructureSchema
);

export default FeeStructure;
