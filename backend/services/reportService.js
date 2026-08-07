import Student from "../models/Student.js";
import Parent from "../models/Parent.js";
import Admission from "../models/Admission.js";
import Finance from "../models/Finance.js";
import Result from "../models/Result.js";
import Payment from "../models/Payment.js";
import Teacher from "../models/Teacher.js";

/**
 * Dashboard Summary Report
 */
export const getDashboardStats = async () => {

    const [
        totalStudents,
        totalTeachers,
        totalParents,
        totalAdmissions,
        revenue,
    ] = await Promise.all([

        Student.countDocuments(),

        Teacher.countDocuments({
            status: "Active",
        }),

        Parent.countDocuments(),

        Admission.countDocuments(),

        Payment.aggregate([
            {
                $match: {
                    status: "Successful",
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]),

    ]);

    return {

        totalStudents,

        totalTeachers,

        totalParents,

        totalAdmissions,

        totalRevenue: revenue[0]?.total || 0,

    };

};



/**
 * Student Report
 */
export const getStudentReport = async () => {

    const totalStudents = await Student.countDocuments();

    const studentsByGender = await Student.aggregate([

        {
            $group: {
                _id: "$gender",
                total: {
                    $sum: 1,
                },
            },
        },

    ]);

    const studentsByClass = await Student.aggregate([

        {
            $group: {
                _id: "$class",
                total: {
                    $sum: 1,
                },
            },
        },

    ]);

    return {

        totalStudents,

        studentsByGender,

        studentsByClass,

    };

};

/**
 * Admission Report
 */
export const getAdmissionReport = async () => {

    const totalAdmissions = await Admission.countDocuments();

    const admissionStatus = await Admission.aggregate([

        {
            $group: {
                _id: "$status",
                total: {
                    $sum: 1,
                },
            },
        },

    ]);

    return {

        totalAdmissions,

        admissionStatus,

    };

};

/**
 * Finance Report
 */
export const getFinanceReport = async () => {

    const totalRevenue = await Payment.aggregate([

        {
            $match: {
                status: "Successful",
            },
        },

        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount",
                },
            },
        },

    ]);

    const paymentStatus = await Payment.aggregate([

        {
            $group: {
                _id: "$status",
                total: {
                    $sum: 1,
                },
            },
        },

    ]);

    const pendingAmount = await Payment.aggregate([

        {
            $match: {
                status: "Pending",
            },
        },

        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount",
                },
            },
        },

    ]);

    return {

        totalRevenue: totalRevenue[0]?.total || 0,

        pendingAmount: pendingAmount[0]?.total || 0,

        paymentStatus,

    };

};

/**
 * Academic Report
 */
export const getAcademicReport = async () => {

    const totalResults = await Result.countDocuments();

    const averageScore = await Result.aggregate([

        {
            $group: {
                _id: null,
                average: {
                    $avg: "$score",
                },
            },
        },

    ]);

    const subjectPerformance = await Result.aggregate([

        {
            $group: {

                _id: "$subject",

                average: {
                    $avg: "$score",
                },

                totalStudents: {
                    $sum: 1,
                },

            },
        },

        {
            $sort: {
                average: -1,
            },
        },

    ]);

    const classPerformance = await Result.aggregate([

        {
            $group: {

                _id: "$class",

                average: {
                    $avg: "$score",
                },

                totalResults: {
                    $sum: 1,
                },

            },
        },

        {
            $sort: {
                average: -1,
            },
        },

    ]);

    const gradeDistribution = await Result.aggregate([

        {
            $group: {
                _id: "$grade",
                total: {
                    $sum: 1,
                },
            },
        },

    ]);

    return {

        totalResults,

        averageScore:
            Number(
                averageScore[0]?.average?.toFixed(2)
            ) || 0,

        subjectPerformance,

        classPerformance,

        gradeDistribution,

    };

};

/**
 * Payment Transaction Report
 */
export const getPaymentReport = async (filters = {}) => {

    const query = {};

    // Search
    if (filters.search) {

        query.$or = [

            {
                paymentReference: {
                    $regex: filters.search,
                    $options: "i",
                },
            },

            {
                transactionReference: {
                    $regex: filters.search,
                    $options: "i",
                },
            },

            {
                payerName: {
                    $regex: filters.search,
                    $options: "i",
                },
            },

            {
                payerEmail: {
                    $regex: filters.search,
                    $options: "i",
                },
            },

            {
                studentName: {
                    $regex: filters.search,
                    $options: "i",
                },
            },

        ];

    }

    // Status
    if (filters.status) {

        query.status = filters.status;

    }

    // Payment Purpose
    if (filters.paymentPurpose) {

        query.paymentPurpose = filters.paymentPurpose;

    }

    // Date Range
    if (filters.startDate || filters.endDate) {

        query.createdAt = {};

        if (filters.startDate) {

            query.createdAt.$gte = new Date(filters.startDate);

        }

        if (filters.endDate) {

            query.createdAt.$lte = new Date(filters.endDate);

        }

    }

    const payments = await Payment.find(query)
        .populate(
            "admission",
            "firstName lastName otherName admissionNumber"
        )
        .sort({
            createdAt: -1,
        });

    return payments;

};