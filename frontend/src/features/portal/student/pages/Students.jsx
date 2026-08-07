import React, { useState } from "react";

import { useGetStudentsQuery } from "../../../../redux/api/studentApi";

import StudentToolbar from "../components/StudentToolbar";
import StudentStatistics from "../components/StudentStatistics";
import StudentTable from "../components/StudentTable";
import StudentPagination from "../components/StudentPagination";
import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal";
import DeleteStudentModal from "../components/DeleteStudentModal";

export default function Students() {

    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const [search, setSearch] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

const {

    data,

    isLoading,

    isError,

    error,

} = useGetStudentsQuery({

    page: currentPage,

    limit: 10,

    search,

    studentClass,

    gender,

    status,

});  

    if (isLoading) {

        return (

            <div className="max-w-7xl mx-auto p-8">

                <div className="animate-pulse space-y-6">

                    <div className="h-10 w-72 bg-gray-200 rounded"></div>

                    <div className="h-28 bg-gray-200 rounded-2xl"></div>

                    <div className="h-[500px] bg-gray-200 rounded-2xl"></div>

                </div>

            </div>

        );

    }

    if (isError) {

        return (

            <div className="max-w-7xl mx-auto p-8">

                <div className="bg-red-50 border border-red-200 rounded-2xl p-8">

                    <h2 className="text-xl font-bold text-red-700">

                        Unable to load students

                    </h2>

                    <p className="mt-3 text-red-600">

                        {error?.data?.message || "Something went wrong."}

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

           <StudentToolbar
    onAddStudent={() => setOpenModal(true)}
    search={search}
    setSearch={setSearch}
    studentClass={studentClass}
    setStudentClass={setStudentClass}
    gender={gender}
    setGender={setGender}
    status={status}
    setStatus={setStatus}
/>

            <StudentStatistics students={data?.data || []} />

            <StudentTable
                students={data?.data || []}

                onEdit={(student) => {
                    setSelectedStudent(student);
                    setOpenEditModal(true);
                }}

                onDelete={(student) => {
                    setStudentToDelete(student);
                    setOpenDeleteModal(true);
                }}
            />

            <StudentPagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
            />

            <AddStudentModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            <EditStudentModal

                open={openEditModal}
                student={selectedStudent}
                onClose={() => {
                    setOpenEditModal(false);
                    setSelectedStudent(null);
                }}
            />

            <DeleteStudentModal

                open={openDeleteModal}

                student={studentToDelete}

                onClose={() => {

                    setOpenDeleteModal(false);

                    setStudentToDelete(null);

                }}

            />

        </div>

    );

}