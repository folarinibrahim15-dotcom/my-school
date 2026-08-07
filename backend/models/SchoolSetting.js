import mongoose from "mongoose";

const schoolSettingSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },

    schoolShortName: {
      type: String,
      default: "",
      trim: true,
    },

    schoolMotto: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    logoPublicId: {
      type: String,
      default: "",
    },

    favicon: {
      type: String,
      default: "",
    },

    faviconPublicId: {
      type: String,
      default: "",
    },

    establishedYear: {
      type: Number,
    },

    currentSession: {
      type: String,
      default: "",
    },

    currentTerm: {
      type: String,
      default: "",
    },

    principalName: {
      type: String,
      default: "",
    },

    principalPhoto: {
      type: String,
      default: "",
    },

    principalPhotoPublicId: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const SchoolSetting = mongoose.model(
  "SchoolSetting",
  schoolSettingSchema
);

export default SchoolSetting;