import Admission from "../models/Admission.js";
import Payment from "../models/Payment.js";
import Teacher from "../models/Teacher.js";
import User from "../models/User.js";

export const getActivityTimeline = async () => {

    const [
        admissions,
        payments,
        teachers,
        users,
    ] = await Promise.all([

        Admission.find()
            .sort({ createdAt: -1 })
            .limit(5),

        Payment.find({
            status: "Successful",
        })
            .sort({ createdAt: -1 })
            .limit(5),

        Teacher.find()
            .sort({ createdAt: -1 })
            .limit(5),

        User.find({
            lastLogin: { $ne: null },
        })
            .sort({ lastLogin: -1 })
            .limit(5),

    ]);

    const activities = [];

    admissions.forEach((item) => {

        activities.push({

            type: "Admission",

            title: "New Student Admitted",

            description: `${item.firstName} ${item.lastName} was admitted into ${item.classApplyingFor}.`,

            createdAt: item.createdAt,

        });

    });

    payments.forEach((item) => {

        activities.push({

            type: "Finance",

            title: "Fee Payment Received",

            description: `₦${item.amount.toLocaleString()} received from ${item.payerName}.`,

            createdAt: item.createdAt,

        });

    });

    teachers.forEach((item) => {

        activities.push({

            type: "Teacher",

            title: "Teacher Added",

            description: `${item.firstName} ${item.lastName} joined the ${item.specialization} Department.`,

            createdAt: item.createdAt,

        });

    });

    users.forEach((item) => {

        activities.push({

            type: "Login",

            title: `${item.role} Login`,

            description: `${item.firstName} ${item.lastName} signed into the ERP.`,

            createdAt: item.lastLogin,

        });

    });

    activities.push({

        type: "Result",

        title: "Results Uploaded",

        description: "Second Term examination results published.",

        createdAt: new Date(),

    });

    activities.sort(

        (a, b) =>

            new Date(b.createdAt) -

            new Date(a.createdAt)

    );

    return activities.slice(0, 10);

};