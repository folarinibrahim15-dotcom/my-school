import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
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

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    imagePublicId: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Academic",
        "Sports",
        "Laboratory",
        "Technology",
        "Hostel",
        "Medical",
        "Library",
        "Transportation",
        "Others",
      ],
      default: "Academic",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
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

const Facility = mongoose.model(
  "Facility",
  facilitySchema
);

export default Facility;
