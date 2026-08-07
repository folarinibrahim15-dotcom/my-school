import React from "react";
import {
    HiChevronLeft,
    HiChevronRight,
} from "react-icons/hi2";

export default function ParentPagination({

    currentPage = 1,

    totalPages = 10,

    onPageChange,

}) {

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {

        pages.push(i);

    }

    return (

        <div
            className="
            mt-8
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-sm
            px-6
            py-5
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-5
            "
        >

            <div className="text-sm text-gray-500">

                Showing page

                <span className="font-semibold mx-1">

                    {currentPage}

                </span>

                of

                <span className="font-semibold mx-1">

                    {totalPages}

                </span>

            </div>

            <div className="flex items-center gap-2">

                <button

                    disabled={currentPage === 1}

                    onClick={() => onPageChange(currentPage - 1)}

                    className="
                    h-10
                    w-10
                    rounded-xl
                    border
                    border-gray-300
                    flex
                    items-center
                    justify-center
                    disabled:opacity-40
                    hover:bg-gray-50
                    transition
                    "

                >

                    <HiChevronLeft />

                </button>

                {

                    pages.map((page) => (

                        <button

                            key={page}

                            onClick={() => onPageChange(page)}

                            className={`
                            h-10
                            w-10
                            rounded-xl
                            transition

                            ${
                                page === currentPage

                                    ? "bg-blue-700 text-white"

                                    : "border border-gray-300 hover:bg-gray-50"

                            }
                            `}
                        >

                            {page}

                        </button>

                    ))

                }

                <button

                    disabled={currentPage === totalPages}

                    onClick={() => onPageChange(currentPage + 1)}

                    className="
                    h-10
                    w-10
                    rounded-xl
                    border
                    border-gray-300
                    flex
                    items-center
                    justify-center
                    disabled:opacity-40
                    hover:bg-gray-50
                    transition
                    "

                >

                    <HiChevronRight />

                </button>

            </div>

        </div>

    );

}