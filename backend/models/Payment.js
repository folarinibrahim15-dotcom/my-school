import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
  admission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
      required: false,
    },

    paymentReference: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    transactionReference: {
      type: String,
      default: "",
      trim: true,
    },

    payerName: {
      type: String,
      required: true,
      trim: true,
    },

    payerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    payerPhone: {
      type: String,
      default: "",
      trim: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    classApplyingFor: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "NGN",
    },

    paymentPurpose: {
      type: String,
      enum: [
    "Admission Form",
    "School Fees",
    "Acceptance Fee",
    "Examination Fee",
    "PTA Levy",
    "Uniform",
    "Books",
    "Exercise Books",
    "Transport",
    "Pocket Money",
    "Hostel",
    "Examination",
    "Miscellaneous",
      ],
      default: "Admission Form",
    },

    paymentMethod: {
      type: String,
      default: "Paystack",
    },

    gatewayResponse: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Successful",
        "Failed",
        "Abandoned",
      ],
      default: "Pending",
    },

    paidAt: Date,

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);