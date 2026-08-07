import React, { useState } from "react";

import { useGetTeachersQuery } from "../../../../../redux/api/teacherApi";

import TeacherToolbar from "../components/TeacherToolbar";
import TeacherStatistics from "../components/TeacherStatistics";
import TeacherTable from "../components/TeacherTable";
import TeacherPagination from "../components/TeacherPagination";
import AddTeacherModal from "../components/AddTeacherModal";
import EditTeacherModal from "../components/EditTeacherModal";
import DeleteTeacherModal from "../components/DeleteTeacherModal";

export default function Teachers() {

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("");

    const [status, setStatus] = useState("");

    const [openAddModal, setOpenAddModal] = useState(false);

    const [openEditModal, setOpenEditModal] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const {

        data,

        isLoading,

        isError,

        error,

    } = useGetTeachersQuery({

        page,

        limit: 10,

        search,

        department,

        status,

    });

    if (isLoading) {

        return <div className="p-8">Loading...</div>;

    }

    if (isError) {

        return (

            <div className="p-8">

                {error?.data?.message || "Unable to load teachers."}

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <TeacherToolbar

                search={search}

                setSearch={setSearch}

                department={department}

                setDepartment={setDepartment}

                status={status}

                setStatus={setStatus}

                onAddTeacher={() => setOpenAddModal(true)}

            />

            <TeacherStatistics teachers={data?.data || []} />

            <TeacherTable

                teachers={data?.data || []}

                onEdit={(teacher) => {

                    setSelectedTeacher(teacher);

                    setOpenEditModal(true);

                }}

                onDelete={(teacher) => {

                    setSelectedTeacher(teacher);

                    setOpenDeleteModal(true);

                }}

            />

<TeacherPagination
    page={page}
    pages={data?.pagination?.pages}
    setPage={setPage}
/>

            <AddTeacherModal

                open={openAddModal}

                onClose={() => setOpenAddModal(false)}

            />

            <EditTeacherModal

                open={openEditModal}

                onClose={() => setOpenEditModal(false)}

                teacher={selectedTeacher}

            />

            <DeleteTeacherModal

                open={openDeleteModal}

                onClose={() => setOpenDeleteModal(false)}

                teacher={selectedTeacher}

            />

        </div>

    );

}