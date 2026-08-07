import React, { useState } from "react";

import { useGetParentsQuery } from "../../../../../redux/api/parentApi";

import ParentToolbar from "../components/ParentToolbar";
import ParentStatistics from "../components/ParentStatistics"
import ParentTable from "../components/ParentTable"
import ParentPagination from "../components/ParentPagination";
import AddParentModal from "../components/AddParentModal";
import EditParentModal from "../components/EditParentModal";
import DeleteParentModal from "../components/DeleteParentModal";

export default function Parents() {


    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const [relationship, setRelationship] = useState("");

    const [gender, setGender] = useState("");

    const [occupation, setOccupation] = useState("");

    const [selectedParent, setSelectedParent] = useState(null);

    const [openEditModal, setOpenEditModal] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);


   const {
    data: parents,
    isLoading,
    isError,
    error

} = useGetParentsQuery({

    page: currentPage,

    limit: 10,

    search,

    relationship,

    gender,

    occupation,

});
    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-8">
                Loading Parents...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-7xl mx-auto p-8 text-red-600">
                {error?.data?.message || "Unable to load parents."}
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

            <ParentToolbar
                onAddParent={() => setOpenModal(true)}
                search={search}
                setSearch={setSearch}
                relationship={relationship}
                setRelationship={setRelationship}
                gender={gender}
                setGender={setGender}
                occupation={occupation}
                setOccupation={setOccupation}
            />

            <ParentStatistics
                parents={parents?.data || []}
            />

            <ParentTable
                parents={parents?.data || []}
                onEdit={(parent) => {
                    setSelectedParent(parent);
                    setOpenEditModal(true);
                }}
                onDelete={(parent) => {
                    setSelectedParent(parent);
                    setOpenDeleteModal(true);
                }}
            />

            <ParentPagination
                currentPage={currentPage}
                totalPages={parents?.pagination?.totalPages || 1}
                onPageChange={setCurrentPage}

            />
            <AddParentModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

            <EditParentModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                parent={selectedParent}
            />

            <DeleteParentModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                parent={selectedParent}
            />

        </div>

    );

}