import React from "react";
import { HiOutlineTrash, HiXMark } from "react-icons/hi2";
import { useDeleteStudentMutation } from "../../../../redux/api/studentApi";

export default function DeleteStudentModal({

    open,

    student,

    onClose,

}) {

    const [

        deleteStudent,

        { isLoading },

    ] = useDeleteStudentMutation();

    if (!open || !student) return null;

    const handleDelete = async () => {

        try {

            await deleteStudent(student._id).unwrap();

            alert("Student deleted successfully.");

            onClose();

        } catch (error) {

            alert(
                error?.data?.message ||
                "Unable to delete student."
            );

        }

    };

  return (
    <div
        style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // bg-black/40
            backdropFilter: 'blur(8px)', // backdrop-blur-sm
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(12px, 4vw, 24px)' // p-6
        }}
        onClick={onClose}
    >
        <div
            onClick={(e) => e.stopPropagation()}
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '1.5rem', // rounded-3xl
                boxShadow: '0 25px 50px rgba(15, 23, 42, 0.15)', // shadow-2xl
                width: '100%',
                maxWidth: '32rem' // max-w-lg
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'clamp(20px, 3vw, 24px)', // p-6
                    borderBottom: '1px solid #e5e7eb'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}> {/* gap-3 */}
                    <div
                        style={{
                            height: '3.5rem', // h-14
                            width: '3.5rem', // w-14
                            borderRadius: '50%', // rounded-full
                            backgroundColor: '#fee2e2', // bg-red-100
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <HiOutlineTrash style={{ color: '#dc2626', fontSize: '1.875rem' }} /> {/* text-red-600 text-3xl */}
                    </div>

                    <div>
                        <h2
                            style={{
                                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', // text-2xl
                                fontWeight: '700',
                                color: '#0f172a',
                                margin: 0,
                                lineHeight: 1.2
                            }}
                        >
                            Delete Student
                        </h2>
                        <p
                            style={{
                                color: '#64748b', // text-gray-500
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                                margin: '0.25rem 0 0 0'
                            }}
                        >
                            This action cannot be undone.
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '0.75rem',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    <HiXMark style={{ fontSize: '1.875rem', color: '#334155' }} /> {/* text-3xl */}
                </button>
            </div>

            {/* Body */}
            <div style={{ padding: 'clamp(20px, 4vw, 32px)' }}> {/* p-8 */}
                <p
                    style={{
                        fontSize: '1.125rem', // text-lg
                        lineHeight: 2, // leading-8
                        color: '#334155',
                        margin: 0
                    }}
                >
                    Are you sure you want to delete
                    <span
                        style={{
                            fontWeight: '700',
                            color: '#dc2626' // text-red-600
                        }}
                    >
                        {" "}{student.firstName} {student.lastName}
                    </span>
                    ?
                </p>
            </div>

            {/* Footer */}
            <div
                style={{
                    borderTop: '1px solid #e5e7eb',
                    padding: 'clamp(20px, 3vw, 24px)', // p-6
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem', // gap-4
                    flexWrap: 'wrap'
                }}
            >
                <button
                    onClick={onClose}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
                    style={{
                        padding: '0.75rem 1.5rem', // px-6 py-3
                        borderRadius: '0.75rem', // rounded-xl
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#334155',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Cancel
                </button>

                <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#b91c1c'; }}
                    onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = '#dc2626'; }}
                    style={{
                        backgroundColor: isLoading ? '#fca5a5' : '#dc2626', // bg-red-600 : disabled
                        color: '#ffffff',
                        padding: '0.75rem 2rem', // px-8 py-3
                        borderRadius: '0.75rem', // rounded-xl
                        border: 'none',
                        fontWeight: '600',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.6 : 1, // disabled:opacity-60
                        transition: 'all 0.2s ease',
                        boxShadow: isLoading ? 'none' : '0 4px 14px rgba(220, 38, 38, 0.25)'
                    }}
                >
                    {isLoading ? "Deleting..." : "Delete Student"}
                </button>
            </div>
        </div>
    </div>
);

}