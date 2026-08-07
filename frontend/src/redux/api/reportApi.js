import { apiSlice } from "./apiSlice";


export const reportApi = apiSlice.injectEndpoints({

    endpoints:(builder)=>({



        getDashboardReport:

        builder.query({

            query:()=>"/reports/dashboard"

        }),




        getStudentReport:

        builder.query({

            query:(filters={})=>({

                url:"/reports/students",

                params:filters

            })

        }),




        getAdmissionReport:

        builder.query({

            query:(filters={})=>({

                url:"/reports/admissions",

                params:filters

            })

        }),




        getFinanceReport:

        builder.query({

            query:(filters={})=>({

                url:"/reports/finance",

                params:filters

            })

        }),




        getAcademicReport:

        builder.query({

            query:(filters={})=>({

                url:"/reports/academic",

                params:filters

            })

        }),




        getPaymentReport:

        builder.query({

            query:(filters={})=>({

                url:"/reports/payments",

                params:filters

            })

        }),



    })

});



export const {

    useGetDashboardReportQuery,

    useGetStudentReportQuery,

    useGetAdmissionReportQuery,

    useGetFinanceReportQuery,

    useGetAcademicReportQuery,

    useGetPaymentReportQuery

}=reportApi;