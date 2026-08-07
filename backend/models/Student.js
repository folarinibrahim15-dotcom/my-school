import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

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

    otherName: {
      type: String,
      default: "",
      trim: true,
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

    class: {
      type: String,
      required: true,
    },

    session: {
      type: String,
      required: true,
    },

    passport: {
      type: String,
      default: "",
    },

    passportPublicId: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    admissionStatus: {
      type: String,
      enum: ["Pending", "Admitted", "Rejected"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


studentSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName} ${this.otherName || ""}`.trim();
});

studentSchema.set("toJSON", { virtuals: true });
studentSchema.set("toObject", { virtuals: true });
const Student = mongoose.model("Student", studentSchema);

export default Student;