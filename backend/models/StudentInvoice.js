import mongoose from "mongoose";

const studentInvoiceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    feeStructure: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeeStructure",
      required: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      ],
      required: true,
    },

    classLevel: {
      type: String,
      required: true,
      trim: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
    },

    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "Unpaid",
        "Partially Paid",
        "Paid",
      ],
      default: "Unpaid",
    },

    dueDate: {
      type: Date,
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
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

/*
|--------------------------------------------------------------------------
| Calculate Balance & Status
|--------------------------------------------------------------------------
*/

studentInvoiceSchema.pre("save", function () {
  this.balance = this.totalAmount - this.amountPaid;

  if (this.amountPaid <= 0) {
    this.status = "Unpaid";
  } else if (this.amountPaid >= this.totalAmount) {
    this.status = "Paid";
  } else {
    this.status = "Partially Paid";
  }
});

const StudentInvoice = mongoose.model(
  "StudentInvoice",
  studentInvoiceSchema
);

export default StudentInvoice;
