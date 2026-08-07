import mongoose from "mongoose";

const curriculumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    academicLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicLevel",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    document: {
      type: String,
      default: "",
    },

    documentPublicId: {
      type: String,
      default: "",
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
        "Full Session",
      ],
      default: "Full Session",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
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

const Curriculum = mongoose.model(
  "Curriculum",
  curriculumSchema
);

export default Curriculum;