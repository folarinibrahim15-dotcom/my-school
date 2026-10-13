import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // NEW - Link to SecurePayment categories - SAFE, auto-filled from title for old data
    category: {
      type: String,
      trim: true,
      default: function () {
        return this.title;
      },
    },
    paymentCategory: {
      type: String,
      trim: true,
      default: function () {
        return this.category || this.title;
      },
    },

    academicSession: {
      type: String,
      required: true,
      trim: true,
    },

    term: {
      type: String,
      enum: ["First Term", "Second Term", "Third Term"],
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
        // Backward compat for your SecurePayment classes
        "Basic 1",
        "Basic 2",
        "Basic 3",
        "Basic 4",
        "Basic 5",
        "Basic 6",
        "JS 1",
        "JS 2",
        "JS 3",
      ],
      required: true,
    },

    tuitionFee: { type: Number, default: 0, min: 0 },
    developmentFee: { type: Number, default: 0, min: 0 },
    examinationFee: { type: Number, default: 0, min: 0 },
    sportsFee: { type: Number, default: 0, min: 0 },
    libraryFee: { type: Number, default: 0, min: 0 },
    laboratoryFee: { type: Number, default: 0, min: 0 },
    boardingFee: { type: Number, default: 0, min: 0 },
    transportFee: { type: Number, default: 0, min: 0 },
    miscellaneousFee: { type: Number, default: 0, min: 0 },

    totalFee: { type: Number, default: 0, min: 0 },

    paymentDeadline: { type: Date },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/*
|--------------------------------------------------------------------------
| Auto Calculate Total Fee + Ensure Category - FIXED
|--------------------------------------------------------------------------
*/
feeStructureSchema.pre("save", function (next) {
  // Ensure category never empty - protects old data
  if (!this.category) this.category = this.title;
  if (!this.paymentCategory) this.paymentCategory = this.category || this.title;

  // Calculate total
  this.totalFee =
    (this.tuitionFee || 0) +
    (this.developmentFee || 0) +
    (this.examinationFee || 0) +
    (this.sportsFee || 0) +
    (this.libraryFee || 0) +
    (this.laboratoryFee || 0) +
    (this.boardingFee || 0) +
    (this.transportFee || 0) +
    (this.miscellaneousFee || 0);

  next(); // THIS WAS MISSING BEFORE - FIXED
});

const FeeStructure = mongoose.model("FeeStructure", feeStructureSchema);
export default FeeStructure;