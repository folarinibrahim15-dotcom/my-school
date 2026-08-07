import React from "react";
import { useDeleteParentMutation } from "../../../../../redux/api/parentApi";

export default function DeleteParentModal({
    open,
    onClose,
    parent,
}) {

    const [
        deleteParent,
        { isLoading }
    ] = useDeleteParentMutation();


    const handleDelete = async () => {

        try {

            console.log("Deleting Parent ID:", parent._id);

            const response = await deleteParent(parent._id);

            console.log("Delete Response:", response);

            onClose();

        } catch (error) {

            console.log("Delete Error:", error);

        }

    };


    if (!open) return null;


    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-md p-8">


                <h2 className="text-2xl font-bold text-gray-800 mb-4">

                    Delete Parent

                </h2>


                <p className="text-gray-600 mb-8">

                    Are you sure you want to delete{" "}

                    <span className="font-semibold text-red-700">

                        {parent?.firstName} {parent?.lastName}

                    </span>

                    ?

                    <br />

                    This action cannot be undone.

                </p>



                <div className="flex justify-end gap-4">


                    <button

                        type="button"

                        onClick={onClose}

                        className="border px-6 py-3 rounded-xl"

                    >

                        Cancel

                    </button>



                    <button

                        type="button"

                        onClick={handleDelete}

                        disabled={isLoading}

                        className="bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-800"

                    >

                        {isLoading
                            ? "Deleting..."
                            : "Delete Parent"}

                    </button>


                </div>


            </div>


        </div>

    );

}