import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
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

    content: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
      trim: true,
    },

    featuredImage: {
      type: String,
      default: "",
    },

    featuredImagePublicId: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "News",
        "Announcement",
        "Event",
        "Achievement",
      ],
      default: "News",
    },

    published: {
      type: Boolean,
      default: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

export default News;