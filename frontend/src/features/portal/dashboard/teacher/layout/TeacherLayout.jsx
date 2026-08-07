import React from "react";
import { Outlet } from "react-router-dom";


import TeacherNavbar from "../components/TeacherNavbar"


export default function TeacherLayout() {


    return (

        <div className="
            flex
            min-h-screen
            bg-slate-100
        ">


            {/* Sidebar */}





            {/* Main Content */}

            <div className="
                flex-1
                flex
                flex-col
            ">


                {/* Navbar */}

                <TeacherNavbar />



                {/* Page Content */}

                <main className="
                    flex-1
                    px-4
                    py-6
                    sm:px-6
                    lg:px-8
                    font-[Candara]
                ">


                    <Outlet />


                </main>


            </div>


        </div>

    );

}