import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    
    profilePhoto: {
    type: String,
    default: "",
  },

  profilePhotoPublicId: {
    type: String,
    default: "",
  },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    occupation: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    relationship: {
      type: String,
      enum: [
        "Father",
        "Mother",
        "Guardian",
      ],
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
      timestamps: true,
    }
);

const Parent = mongoose.model("Parent", parentSchema);

export default Parent;