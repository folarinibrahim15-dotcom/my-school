import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetAdmissionsQuery } from "../../../../redux/api/admissionApi";

export default function RecentAdmissions() {

    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
    } = useGetAdmissionsQuery({
        page: 1,
        limit: 5,
        search: "",
    });

    const admissions = data?.data || [];

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    };

   return (
    <div
        style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
            padding: '1.5rem',
            margin: '1.5rem',
            border: '1px solid #f1f5f9',
            maxWidth: '100%',
            boxSizing: 'border-box'
        }}
    >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}
        >
            <h2
                style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    margin: '0',
                    lineHeight: '1.6',
                    letterSpacing: '-0.01em'
                }}
            >
                Recent Admissions
            </h2>

            <button
                onClick={() => navigate("/portal/admissions")}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                style={{
                    color: '#2563eb',
                    fontWeight: '600',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    transition: 'opacity 0.2s ease',
                    fontSize: '0.95rem'
                }}
            >
                View All
            </button>
        </div>

        {isLoading ? (
            <div
                style={{
                    padding: '2.5rem 0',
                    textAlign: 'center',
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                }}
            >
                Loading recent admissions...
            </div>
        ) : isError ? (
            <div
                style={{
                    padding: '2.5rem 0',
                    textAlign: 'center',
                    color: '#dc2626',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                }}
            >
                Unable to load recent admissions.
            </div>
        ) : admissions.length === 0 ? (
            <div
                style={{
                    padding: '2.5rem 0',
                    textAlign: 'center',
                    color: '#64748b',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                }}
            >
                No admissions found.
            </div>
        ) : (
            <div
                style={{
                    overflowX: 'auto',
                    width: '100%',
                    maxWidth: '100%'
                }}
            >
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        minWidth: '600px' // prevents squishing on mobile, enables scroll
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                borderBottom: '1px solid #e2e8f0'
                            }}
                        >
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '1rem 0',
                                    fontWeight: '600',
                                    color: '#475569',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Student
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '1rem 0',
                                    fontWeight: '600',
                                    color: '#475569',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Class
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '1rem 0',
                                    fontWeight: '600',
                                    color: '#475569',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Admission No.
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '1rem 0',
                                    fontWeight: '600',
                                    color: '#475569',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Status
                            </th>
                            <th
                                style={{
                                    textAlign: 'left',
                                    padding: '1rem 0',
                                    fontWeight: '600',
                                    color: '#475569',
                                    fontSize: '0.875rem'
                                }}
                            >
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {admissions.map((student) => (
                            <tr
                                key={student._id}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                style={{
                                    borderBottom: '1px solid #f1f5f9',
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <td
                                    style={{
                                        padding: '1.25rem 0',
                                        fontWeight: '500',
                                        color: '#0f172a',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {[
                                        student.firstName,
                                        student.lastName,
                                        student.otherName,
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                </td>
                                <td
                                    style={{
                                        padding: '1.25rem 0',
                                        color: '#475569',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {student.classApplyingFor || "-"}
                                </td>
                                <td
                                    style={{
                                        padding: '1.25rem 0',
                                        color: '#475569',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {student.admissionNumber || "-"}
                                </td>
                                <td
                                    style={{
                                        padding: '1.25rem 0'
                                    }}
                                >
                                    <span
                                        style={{
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            backgroundColor:
                                                student.status === "Approved"
                                                    ? "#dcfce7"
                                                    : student.status === "Pending"
                                                    ? "#fef9c3"
                                                    : student.status === "Rejected"
                                                    ? "#fee2e2"
                                                    : "#f1f5f9",
                                            color:
                                                student.status === "Approved"
                                                    ? "#15803d"
                                                    : student.status === "Pending"
                                                    ? "#a16207"
                                                    : student.status === "Rejected"
                                                    ? "#b91c1c"
                                                    : "#475569"
                                        }}
                                    >
                                        {student.status || "Pending"}
                                    </span>
                                </td>
                                <td
                                    style={{
                                        padding: '1.25rem 0',
                                        color: '#475569',
                                        fontSize: '0.95rem'
                                    }}
                                >
                                    {formatDate(student.createdAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
);

}