import React, { useState } from "react";

import {
    useGetAdmissionsQuery,
} from "../../../../../redux/api/admissionApi";

import AdmissionStatistics from "../components/AdmissionStatistics";
import AdmissionToolbar from "../components/AdmissionToolbar";
import AdmissionTable from "../components/AdmissionTable";
import AdmissionPagination from "../components/AdmissionPagination";

import AddAdmissionModal from "../components/AddAdmissionModal";
import EditAdmissionModal from "../components/EditAdmissionModal";
import DeleteAdmissionModal from "../components/DeleteAdmissionModal";

export default function Admissions() {

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [classApplyingFor, setClassApplyingFor] = useState("");

    const [openAdd, setOpenAdd] = useState(false);

    const [editingAdmission, setEditingAdmission] = useState(null);

    const [deletingAdmission, setDeletingAdmission] = useState(null);

    const { data, isLoading } = useGetAdmissionsQuery({

        page,

        limit: 10,

        search,

        status,

        classApplyingFor,

    });

    const admissions = data?.data || [];

    return (

        <div className="space-y-8">

            <AdmissionStatistics
                admissions={admissions}
            />

            <AdmissionToolbar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                classApplyingFor={classApplyingFor}
                setClassApplyingFor={setClassApplyingFor}
                onAdd={() => setOpenAdd(true)}
            />

            <AdmissionTable
                admissions={admissions}
                loading={isLoading}
                onEdit={setEditingAdmission}
                onDelete={setDeletingAdmission}
            />

            <AdmissionPagination
                page={page}
                pages={data?.pages || 1}
                setPage={setPage}
            />

            <AddAdmissionModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
            />

            <EditAdmissionModal
                open={!!editingAdmission}
                onClose={() => setEditingAdmission(null)}
                admission={editingAdmission}
            />

            <DeleteAdmissionModal
                open={!!deletingAdmission}
                onClose={() => setDeletingAdmission(null)}
                admission={deletingAdmission}
            />

        </div>

    );

}