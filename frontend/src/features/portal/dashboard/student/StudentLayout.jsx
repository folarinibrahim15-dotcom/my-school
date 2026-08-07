import React from "react";
import { Outlet } from "react-router-dom";

import StudentSidebar from "./components/StudentSidebar";
import StudentNavbar from "./components/StudentNavbar";


export default function StudentLayout() {

    return (
        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}
            <StudentSidebar />


            {/* Main Area */}
            <div className="flex-1 flex flex-col">


                {/* Navbar */}
                <StudentNavbar />


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