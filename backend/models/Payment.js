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

    // Additional student info from SecurePayment
    admissionNumber: { type: String, default: "", trim: true },
    studentClass: { type: String, default: "", trim: true },
    student: { type: mongoose.Schema.Types.Mixed }, // stores full student object if needed

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: { type: Number, default: 0 },

    currency: {
      type: String,
      default: "NGN",
    },

    // MAIN CATEGORY - FIXED ENUM TO INCLUDE ALL + backward compat
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
        "School Fee", // alias
        "Bus Fee", // alias
      ],
      default: "School Fees",
    },

    // NEW FIELDS - ALL SAVE SAME CATEGORY SO REPORTS NEVER FAIL
    paymentCategory: { type: String, default: "School Fees", trim: true },
    paymentType: { type: String, default: "School Fees", trim: true },
    feeType: { type: String, default: "", trim: true },
    category: { type: String, default: "", trim: true },
    type: { type: String, default: "", trim: true },
    purpose: { type: String, default: "", trim: true },

    breakdown: { type: String, default: "" },
    academicSession: { type: String, default: "2025/2026" },
    term: { type: String, default: "First Term" },

    paymentMethod: {
      type: String,
      default: "Paystack",
    },

    gatewayResponse: { type: String, default: "" },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} }, // Allows Paystack metadata

    status: {
      type: String,
      enum: ["Pending", "Successful", "Failed", "Abandoned", "Paid", "Completed"],
      default: "Pending",
    },

    paidAt: Date,
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Auto-sync all category fields + totalAmount - PROTECTS OLD DATA
paymentSchema.pre("save", function (next) {
  const finalCat = this.paymentCategory || this.paymentType || this.category || this.feeType || this.paymentPurpose || "School Fees";

  // Sync all fields to same category
  this.paymentCategory = finalCat;
  this.paymentType = finalCat;
  this.category = finalCat;
  this.feeType = finalCat;
  this.type = finalCat;
  this.purpose = finalCat;
  this.paymentPurpose = finalCat; // keep enum happy - enum now includes all

  if (!this.totalAmount) this.totalAmount = this.amount;

  next();
});

export default mongoose.model("Payment", paymentSchema);