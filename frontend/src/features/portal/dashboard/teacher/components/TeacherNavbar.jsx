import React from "react";

import {
    FiBell,
    FiChevronDown
} from "react-icons/fi";


export default function TeacherNavbar() {


    return (

        <header className="
            h-20
            bg-white
            shadow-sm
            flex
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
        ">


            {/* Left Section */}

            <div>


                <h1 className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    text-blue-700
                    font-[Candara]
                ">

                    Teacher Dashboard

                </h1>



                <p className="
                    text-sm
                    text-slate-500
                ">

                    Manage your classes and students

                </p>


            </div>





            {/* Right Section */}

            <div className="
                flex
                items-center
                gap-5
            ">




                {/* Notification */}

                <button

                    className="
                        relative
                        text-slate-600
                        hover:text-blue-700
                    "

                >

                    <FiBell size={22}/>



                    <span className="
                        absolute
                        -top-1
                        -right-1
                        h-4
                        w-4
                        rounded-full
                        bg-red-500
                        text-white
                        text-[10px]
                        flex
                        items-center
                        justify-center
                    ">

                        5

                    </span>


                </button>





                {/* Teacher Profile */}

                <div className="
                    flex
                    items-center
                    gap-3
                    cursor-pointer
                ">



                    <img

                        src="https://i.pravatar.cc/100?img=12"

                        alt="teacher"

                        className="
                            h-10
                            w-10
                            rounded-full
                            object-cover
                        "

                    />




                    <div className="
                        hidden
                        sm:block
                    ">


                        <p className="
                            text-sm
                            font-semibold
                            text-slate-700
                        ">

                            Mr. Ade

                        </p>



                        <p className="
                            text-xs
                            text-slate-500
                        ">

                            Mathematics Teacher

                        </p>



                    </div>




                    <FiChevronDown

                        className="
                            text-slate-500
                        "

                    />


                </div>



            </div>



        </header>

    );

}