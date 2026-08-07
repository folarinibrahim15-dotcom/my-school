import React, { useState } from "react";

export default function UserSettings() {
    const [users] = useState([
        {
            id: 1,
            name: "Administrator",
            email: "admin@school.com",
            role: "Admin",
            status: "Active",
        },
        {
            id: 2,
            name: "John Smith",
            email: "teacher@school.com",
            role: "Teacher",
            status: "Active",
        },
        {
            id: 3,
            name: "Mary Johnson",
            email: "accountant@school.com",
            role: "Accountant",
            status: "Inactive",
        },
    ]);

    const wrapper = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(20px, 4vw, 2rem)", // p-8 responsive
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const header = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem", // mb-8
        flexWrap: "wrap",
        gap: "1rem"
    };

    const title = {
        fontSize: "clamp(1.25rem, 4vw, 1.5rem)", // text-2xl
        fontWeight: "700",
        color: "#0f172a",
        margin: 0,
        lineHeight: 1.3
    };

    const btnPrimary = {
        backgroundColor: "#1e40af",
        color: "#ffffff",
        padding: "0.75rem 1.5rem", // px-6 py-3
        borderRadius: "0.75rem", // rounded-xl
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.95rem",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(30, 64, 175, 0.25)"
    };

    const tableWrapper = {
        width: "100%",
        overflowX: "auto" // fallback for tablet
    };

    const table = {
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "640px"
    };

    const th = {
        textAlign: "left",
        padding: "1rem 0", // py-4
        borderBottom: "1px solid #e5e7eb",
        color: "#475569",
        fontWeight: "600",
        fontSize: "0.9rem"
    };

    const td = {
        padding: "1rem 0", // py-4
        borderBottom: "1px solid #f1f5f9",
        color: "#334155",
        fontSize: "0.95rem"
    };

    const roleBadge = {
        display: "inline-block",
        padding: "0.375rem 0.75rem", // px-3 py-1
        borderRadius: "9999px", // rounded-full
        backgroundColor: "#dbeafe", // bg-blue-100
        color: "#1d4ed8", // text-blue-700
        fontSize: "0.85rem",
        fontWeight: "600"
    };

    const getStatusBadge = (status) => ({
        display: "inline-block",
        padding: "0.375rem 0.75rem",
        borderRadius: "9999px",
        color: "#ffffff",
        backgroundColor: status === "Active"? "#16a34a" : "#dc2626", // green-600 / red-600
        fontSize: "0.85rem",
        fontWeight: "600"
    });

    const actionBtn = (color) => ({
        color: color,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "500",
        padding: 0
    });

    const actions = {
        display: "flex",
        justifyContent: "center",
        gap: "0.75rem" // gap-3
    };

    return (
        <div style={wrapper} className="user-settings-table">
            <div style={header}>
                <h2 style={title}>
                    👥 User Management
                </h2>
                <button
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e3a8a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                    style={btnPrimary}
                >
                    + Add Administrator
                </button>
            </div>

            <div style={tableWrapper}>
                <table style={table}>
                    <thead>
                        <tr>
                            <th style={th}>Name</th>
                            <th style={th}>Email</th>
                            <th style={th}>Role</th>
                            <th style={th}>Status</th>
                            <th style={{...th, textAlign: "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                                <td style={td} data-label="Name">{user.name}</td>
                                <td style={td} data-label="Email">{user.email}</td>
                                <td style={td} data-label="Role">
                                    <span style={roleBadge}>{user.role}</span>
                                </td>
                                <td style={td} data-label="Status">
                                    <span style={getStatusBadge(user.status)}>{user.status}</span>
                                </td>
                                <td style={{...td, textAlign: "center"}} data-label="Actions">
                                    <div style={actions}>
                                        <button
                                            style={actionBtn("#2563eb")}
                                            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                                        >Edit</button>
                                        <button
                                            style={actionBtn("#ca8a04")}
                                            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                                        >Reset Password</button>
                                        <button
                                            style={actionBtn("#dc2626")}
                                            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                                        >Disable</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Responsive: Stack into cards */}
            <style>{`
                @media (max-width: 767px) {
                 .user-settings-table table,
                 .user-settings-table thead,
                 .user-settings-table tbody,
                 .user-settings-table th,
                 .user-settings-table td,
                 .user-settings-table tr {
                    display: block;
                    width: 100%;
                  }
                 .user-settings-table thead { display: none; }
                 .user-settings-table tr {
                    border: 1px solid #e5e7eb;
                    border-radius: 1rem;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: #fff;
                    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
                  }
                 .user-settings-table td {
                    border: none;
                    padding: 0.5rem 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                  }
                 .user-settings-table td:before {
                    content: attr(data-label);
                    font-weight: 600;
                    color: #475569;
                    flex-shrink: 0;
                  }
                 .user-settings-table td:last-child {
                    justify-content: center;
                    padding-top: 1rem;
                    border-top: 1px dashed #e5e7eb;
                  }
                }
            `}</style>
        </div>
    );
}