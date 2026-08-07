import React from "react";
import { NavLink } from "react-router-dom";

import {
    FiHome,
    FiUser,
    FiBookOpen,
    FiFileText,
    FiCheckSquare,
    FiBarChart2,
    FiBell,
    FiSettings,
    FiLogOut
} from "react-icons/fi";


export default function TeacherSidebar() {


    const menuItems = [

        {
            name: "Dashboard",
            path: "/portal/teacher/dashboard",
            icon: <FiHome />
        },


        {
            name: "My Profile",
            path: "/portal/teacher/profile",
            icon: <FiUser />
        },


        {
            name: "My Classes",
            path: "/portal/teacher/classes",
            icon: <FiBookOpen />
        },


        {
            name: "Assignments",
            path: "/portal/teacher/assignments",
            icon: <FiFileText />
        },


        {
            name: "Attendance",
            path: "/portal/teacher/attendance",
            icon: <FiCheckSquare />
        },


        {
            name: "Results",
            path: "/portal/teacher/results",
            icon: <FiBarChart2 />
        },


        {
            name: "Announcements",
            path: "/portal/teacher/announcements",
            icon: <FiBell />
        },


        {
            name: "Settings",
            path: "/portal/teacher/settings",
            icon: <FiSettings />
        }

    ];



    return (

        <aside className="
            w-64
            bg-white
            shadow-md
            min-h-screen
            hidden
            md:block
        ">



            {/* Logo */}

            <div className="
                h-20
                flex
                items-center
                justify-center
                border-b
                font-bold
                text-xl
                text-blue-700
            ">

                Teacher Portal

            </div>




            {/* Navigation */}

            <nav className="
                mt-6
                px-4
                space-y-2
            ">


                {
                    menuItems.map((item) => (

                        <NavLink

                            key={item.name}

                            to={item.path}

                            className={({isActive}) => `

                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                rounded-lg
                                transition

                                ${
                                    isActive

                                    ?

                                    "bg-blue-700 text-white"

                                    :

                                    "text-slate-600 hover:bg-blue-50"

                                }

                            `}

                        >


                            <span className="text-lg">

                                {item.icon}

                            </span>



                            <span>

                                {item.name}

                            </span>



                        </NavLink>

                    ))
                }


            </nav>





            {/* Logout */}

            <div className="
                absolute
                bottom-6
                px-4
                w-64
            ">


                <button

                    className="
                        flex
                        items-center
                        gap-3
                        w-full
                        px-4
                        py-3
                        rounded-lg
                        text-red-600
                        hover:bg-red-50
                    "

                >

                    <FiLogOut />

                    Logout

                </button>


            </div>



        </aside>

    );

}