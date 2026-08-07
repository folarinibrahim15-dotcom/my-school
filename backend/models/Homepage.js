import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
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

    buttonText: {
      type: String,
      default: "Learn More",
    },

    buttonLink: {
      type: String,
      default: "/about",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: true }
);

const featureSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    icon: String,
  },
  { _id: true }
);

const counterSchema = new mongoose.Schema(
  {
    title: String,
    value: Number,
  },
  { _id: true }
);

const homepageSchema = new mongoose.Schema(
  {
    heroSlides: [heroSlideSchema],

    welcomeTitle: {
      type: String,
      default: "",
    },

    welcomeMessage: {
      type: String,
      default: "",
    },

    principalMessage: {
      type: String,
      default: "",
    },

    whyChooseUs: [featureSchema],

    counters: [counterSchema],

    callToActionTitle: {
      type: String,
      default: "",
    },

    callToActionText: {
      type: String,
      default: "",
    },

    callToActionButton: {
      type: String,
      default: "Apply Now",
    },

    callToActionLink: {
      type: String,
      default: "/admissions",
    },
  },
  {
    timestamps: true,
  }
);

const Homepage = mongoose.model("Homepage", homepageSchema);

export default Homepage;