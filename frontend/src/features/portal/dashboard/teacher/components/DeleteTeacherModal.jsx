import React from "react";
import { HiExclamationTriangle, HiXMark } from "react-icons/hi2";
import { useDeleteTeacherMutation } from "../../../../../redux/api/teacherApi";

export default function DeleteTeacherModal({
    open,
    onClose,
    teacher,
}) {
    const [deleteTeacher, { isLoading }] = useDeleteTeacherMutation();

    if (!open || !teacher) return null;

    const handleDelete = async () => {
        try {
            await deleteTeacher(teacher._id).unwrap();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const buttonDanger = {
        backgroundColor: isLoading? "#fca5a5" : "#dc2626", // red-600
        color: "#ffffff",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        border: "none",
        fontWeight: "600",
        cursor: isLoading? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        opacity: isLoading? 0.7 : 1,
        boxShadow: isLoading? "none" : "0 4px 14px rgba(220, 38, 38, 0.25)",
        fontSize: "0.95rem"
    };

    const buttonSecondary = {
        border: "1px solid #cbd5e1",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.95rem"
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
                padding: "clamp(12px, 4vw, 24px)"
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "1.5rem",
                    boxShadow: "0 25px 50px rgba(15, 23, 42, 0.15)",
                    width: "100%",
                    maxWidth: "32rem", // max-w-md
                    padding: "clamp(20px, 4vw, 32px)",
                    boxSizing: "border-box"
                }}
            >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <div
                            style={{
                                width: "3rem",
                                height: "3rem",
                                borderRadius: "1rem",
                                backgroundColor: "#fee2e2", // bg-red-100
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0
                            }}
                        >
                            <HiExclamationTriangle size={24} style={{ color: "#dc2626" }} />
                        </div>
                        <h2
                            style={{
                                fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
                                fontWeight: "700",
                                color: "#dc2626", // text-red-600
                                margin: 0,
                                lineHeight: 1.3
                            }}
                        >
                            Delete Teacher
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f1f5f9"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                        style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            padding: "0.5rem",
                            borderRadius: "0.75rem",
                            transition: "background-color 0.2s ease",
                            flexShrink: 0
                        }}
                    >
                        <HiXMark size={24} style={{ color: "#334155" }} />
                    </button>
                </div>

                {/* Content */}
                <p
                    style={{
                        marginTop: "1rem",
                        color: "#475569", // text-gray-600
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        margin: "1rem 0 0 0"
                    }}
                >
                    Are you sure you want to permanently delete 
                    <span style={{ fontWeight: "700", color: "#0f172a" }}>
                        {" "}{teacher.firstName} {teacher.lastName}
                    </span>
                    ? This action cannot be undone.
                </p>

                {/* Actions */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1rem",
                        marginTop: "2rem",
                        flexWrap: "wrap"
                    }}
                >
                    <button
                        onClick={onClose}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                        style={buttonSecondary}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#b91c1c"; }}
                        onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = "#dc2626"; }}
                        style={buttonDanger}
                    >
                        {isLoading? "Deleting..." : "Delete Teacher"}
                    </button>
                </div>
            </div>
        </div>
    );
}