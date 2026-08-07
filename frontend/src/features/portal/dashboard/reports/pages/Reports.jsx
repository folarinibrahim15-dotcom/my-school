import React from "react";
import { useState } from "react";

import {
    useGetDashboardReportQuery,
    useGetStudentReportQuery,
    useGetAdmissionReportQuery,
    useGetFinanceReportQuery,
    useGetAcademicReportQuery,
    useGetPaymentReportQuery
} from "../../../../../redux/api/reportApi";


import ReportsToolbar from "../components/ReportsToolbar";
import ReportsStatistics from "../components/ReportsStatistics";
import ReportsCharts from "../components/ReportsCharts";
import ReportsTable from "../components/ReportsTable";
import ReportsPagination from "../components/ReportsPagination"


const Reports = () => {

    const [filters,setFilters] = useState({

    type:"",
    session:"",
    term:"",
    startDate:"",
    endDate:""

});

    const {
        data:dashboardData,
        isLoading:dashboardLoading
    } = useGetDashboardReportQuery(filters);



    const {
        data:studentData
    } = useGetStudentReportQuery(filters);



    const {
        data:admissionData
    } = useGetAdmissionReportQuery(filters);



    const {
        data:financeData
    }=useGetFinanceReportQuery(filters);


    const {
        data:academicData
    } = useGetAcademicReportQuery(filters);

    const {
    data:paymentData
    }=useGetPaymentReportQuery(filters);



    if(dashboardLoading){

        return (
            <div className="p-6">
                Loading reports...
            </div>
        );

    }



    return (

        <div className="space-y-6">


            <ReportsToolbar

            filters={filters}
            setFilters={setFilters}
            payments={paymentData?.data || []}

        />


            <ReportsStatistics

                dashboard={
                    dashboardData?.data
                }

            />


            <ReportsCharts

                students={
                    studentData?.data
                }


                finance={
                    financeData?.data
                }


                admissions={
                    admissionData?.data
                }


                academic={
                    academicData?.data
                }

            />

            <ReportsTable

                    payments={
                        paymentData?.data || []
                    }

            />


        </div>

    );

};


export default Reports;