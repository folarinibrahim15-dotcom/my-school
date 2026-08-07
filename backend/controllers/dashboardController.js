import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Parent from "../models/Parent.js";
import Payment from "../models/Payment.js";
import StudentInvoice from "../models/StudentInvoice.js";
import Admission from "../models/Admission.js";


export const dashboardAnalytics = async (req, res, next) => {
  try {

    /*
    |--------------------------------------------------------------------------
    | Counts
    |--------------------------------------------------------------------------
    */

    const totalStudents = await Student.countDocuments();

    const totalTeachers = await Teacher.countDocuments();

    const totalParents = await Parent.countDocuments();

    const totalAdmissions = await Admission.countDocuments();

    const totalInvoices = await StudentInvoice.countDocuments();

    const totalPayments = await Payment.countDocuments();

    /*
    |--------------------------------------------------------------------------
    | Revenue
    |--------------------------------------------------------------------------
    */

    const revenueResult = await Payment.aggregate([
      {
        $match: {
          status: "Successful",
        },
      },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].revenue
        : 0;

    /*
    |--------------------------------------------------------------------------
    | Pending Invoices
    |--------------------------------------------------------------------------
    */

    const pendingInvoices =
      await StudentInvoice.countDocuments({
        status: "Pending",
      });

    /*
    |--------------------------------------------------------------------------
    | Recent Payments
    |--------------------------------------------------------------------------
    */

    const recentPayments =
      await Payment.find()
        .populate(
          "student",
          "firstName lastName admissionNumber"
        )
        .sort({ createdAt: -1 })
        .limit(10);

    res.status(200).json({

      success: true,

      data: {

        overview: {
          totalStudents,
          totalTeachers,
          totalParents,
          totalAdmissions,
          totalInvoices,
          totalPayments,
          totalRevenue,
          pendingInvoices,
        },

        recentPayments,

      },

    });

  } catch (error) {
    next(error);
  }
};


/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const getDashboardStats = async (req, res, next) => {
  try {

    const [
      totalStudents,
      totalTeachers,
      totalParents,
      totalAdmissions,
      pendingAdmissions,
      approvedAdmissions,
      successfulPayments,
      pendingPayments,
    ] = await Promise.all([

      Student.countDocuments(),

      Teacher.countDocuments(),

      Parent.countDocuments(),

      Admission.countDocuments(),

      Admission.countDocuments({
        status: "Pending",
      }),

      Admission.countDocuments({
        status: "Approved",
      }),

      Payment.countDocuments({
        status: "Successful",
      }),

      Payment.countDocuments({
        status: "Pending",
      }),

    ]);

    const revenue = await Payment.aggregate([
      {
        $match: {
          status: "Successful",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,

      data: {

        totalStudents,

        totalTeachers,

        totalParents,

        totalAdmissions,

        pendingAdmissions,

        approvedAdmissions,

        successfulPayments,

        pendingPayments,

        totalRevenue:
          revenue.length > 0
            ? revenue[0].totalRevenue
            : 0,

      },

    });

  } catch (error) {
    next(error);
  }
};