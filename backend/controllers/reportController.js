import {
    getDashboardStats,
    getStudentReport,
    getAdmissionReport,
    getFinanceReport,
    getAcademicReport,
    getPaymentReport
} from "../services/reportService.js";



/**
 * @desc Get dashboard report summary
 * @route GET /api/reports/dashboard
 */
export const dashboardReport = async (req, res) => {

    try {

        const report = await getDashboardStats();


        res.status(200).json({
            success:true,
            data:report
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




/**
 * @desc Get student analytics report
 * @route GET /api/reports/students
 */
export const studentReport = async (req,res)=>{

    try{

        const report = await getStudentReport();


        res.status(200).json({
            success:true,
            data:report
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




/**
 * @desc Get admission analytics report
 * @route GET /api/reports/admissions
 */
export const admissionReport = async(req,res)=>{

    try{

        const report = await getAdmissionReport();


        res.status(200).json({
            success:true,
            data:report
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

/**
 * @desc Get finance analytics report
 * @route GET /api/reports/finance
 */
export const financeReport = async(req,res)=>{

    try{

        const report = await getFinanceReport();


        res.status(200).json({
            success:true,
            data:report
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

/**
 * @desc Get academic analytics report
 * @route GET /api/reports/academic
 */
export const academicReport = async(req,res)=>{

    try{

        const report = await getAcademicReport();


        res.status(200).json({
            success:true,
            data:report
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

/**
 * @desc Get payment transactions report
 * @route GET /api/reports/payments
 */
export const paymentReport = async(req,res)=>{

    try{

        const report =
            await getPaymentReport(req.query);



        res.status(200).json({

            success:true,

            data:report

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};