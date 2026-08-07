import mongoose from "mongoose";

const coreValueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    icon: {
      type: String,
      default: "",
    },
  },
  {
    _id: true,
  }
);

const historyImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: true,
  }
);

const aboutSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      default: "Sound Peace International Schools",
    },

    history: {
      type: String,
      default: "",
    },

    mission: {
      type: String,
      default: "",
    },

    vision: {
      type: String,
      default: "",
    },

    philosophy: {
      type: String,
      default: "",
    },

    principalMessage: {
      type: String,
      default: "",
    },

    principalName: {
      type: String,
      default: "",
    },

    principalImage: {
      type: String,
      default: "",
    },

    principalImagePublicId: {
      type: String,
      default: "",
    },

    coreValues: [coreValueSchema],

    historyImages: [historyImageSchema],
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model("About", aboutSchema);

export default About;