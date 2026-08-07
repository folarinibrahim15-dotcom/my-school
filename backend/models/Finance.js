import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(

    {

        receiptNumber: {

            type: String,

            required: true,

            unique: true,

            trim: true,

        },

        student: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Student",

            required: true,

        },

        studentName: {

            type: String,

            required: true,

            trim: true,

        },

        className: {

            type: String,

            required: true,

            trim: true,

        },

        paymentType: {

            type: String,

            enum: [

                "School Fees",

                "Admission Fees",

                "Examination Fees",

                "Transport",

                "Hostel",

                "Uniform",

                "Books",

                "Other",

            ],

            required: true,

        },

        amount: {

            type: Number,

            required: true,

            min: 0,

        },

        paymentMethod: {

            type: String,

            enum: [

                "Cash",

                "Bank Transfer",

                "POS",

                "Online",

            ],

            required: true,

        },

        paymentDate: {

            type: Date,

            default: Date.now,

        },

        status: {

            type: String,

            enum: [

                "Pending",

                "Paid",

                "Failed",

                "Refunded",

            ],

            default: "Paid",

        },

        remarks: {

            type: String,

            default: "",

            trim: true,

        },

        recordedBy: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

        },

    },

    {

        timestamps: true,

    }

);

export default mongoose.model("Finance", financeSchema);