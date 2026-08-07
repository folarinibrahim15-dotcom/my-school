import React from "react";
import { useParams } from "react-router-dom";
import { useGetAdmissionQuery } from "../../../../../redux/api/admissionApi";

export default function AdmissionDetails() {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetAdmissionQuery(id);

    if (isLoading) {
        return (
            <div style={{ padding: "2rem", color: "#64748b", fontSize: "0.95rem" }}>
                Loading admission...
            </div>
        );
    }

    if (isError ||!data?.data) {
        return (
            <div style={{ padding: "2rem", color: "#64748b", fontSize: "0.95rem" }}>
                Unable to load admission.
            </div>
        );
    }

    const admission = data.data;

    const getStatusColors = (status) => {
        switch (status) {
            case "Pending": return { bg: "#FEF9C3", color: "#A16207" }; // yellow
            case "Under Review": return { bg: "#DBEAFE", color: "#1D4ED8" }; // blue
            case "Approved": return { bg: "#DCFCE7", color: "#15803D" }; // green
            case "Rejected": return { bg: "#FEE2E2", color: "#B91C1C" }; // red
            default: return { bg: "#F3E8FF", color: "#7C3AED" }; // purple
        }
    };

    const statusStyle = getStatusColors(admission.status);

    const cardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1rem", // rounded-2xl
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        padding: "1.5rem", // p-6
        boxSizing: "border-box"
    };

    const heroCardStyle = {
       ...cardStyle,
        borderRadius: "1.5rem", // rounded-3xl
        padding: "clamp(20px, 4vw, 32px)", // p-8 responsive
    };

    const infoLabel = {
        color: "#64748b", // text-gray-500
        fontSize: "0.875rem",
        margin: "0 0 0.25rem 0",
        fontWeight: 500
    };

    const infoValue = {
        color: "#0f172a",
        fontSize: "0.95rem",
        fontWeight: 600,
        margin: 0,
        wordBreak: "break-word"
    };

    return (
        <div
            style={{
                maxWidth: "80rem", // max-w-7xl
                margin: "0 auto",
                padding: "clamp(16px, 4vw, 32px)",
                display: "flex",
                flexDirection: "column",
                gap: "2rem" // space-y-8
            }}
        >
            {/* Header */}
            <div style={heroCardStyle}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                        alignItems: "flex-start"
                    }}
                >
                    {/* Image */}
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <img
                            src={
                                admission.documents?.[0]?.url ||
                                `https://ui-avatars.com/api/?name=${admission.firstName}+${admission.lastName}&size=300`
                            }
                            alt={admission.firstName}
                            style={{
                                width: "13rem", // w-52
                                height: "13rem", // h-52
                                borderRadius: "1.5rem", // rounded-3xl
                                objectFit: "cover",
                                border: "1px solid #e5e7eb",
                                flexShrink: 0
                            }}
                        />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, width: "100%" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                gap: "1rem"
                            }}
                        >
                            <div>
                                <h1
                                    style={{
                                        fontSize: "clamp(1.875rem, 5vw, 2.25rem)", // text-4xl responsive
                                        fontWeight: "700",
                                        color: "#0f172a",
                                        margin: 0
                                    }}
                                >
                                    {admission.firstName} {admission.lastName}
                                </h1>
                                <p
                                    style={{
                                        color: "#64748b",
                                        marginTop: "0.5rem",
                                        fontSize: "0.95rem",
                                        margin: "0.5rem 0 0 0"
                                    }}
                                >
                                    Application No: {admission.applicationNumber}
                                </p>
                            </div>

                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "0.5rem 1rem", // px-4 py-2
                                    borderRadius: "999px",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    backgroundColor: statusStyle.bg,
                                    color: statusStyle.color,
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {admission.status}
                            </span>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", // 1 col mobile, 2 col md
                                gap: "1.5rem",
                                marginTop: "2rem"
                            }}
                        >
                            <div>
                                <p style={infoLabel}>Email</p>
                                <h3 style={infoValue}>{admission.email}</h3>
                            </div>
                            <div>
                                <p style={infoLabel}>Phone Number</p>
                                <h3 style={infoValue}>{admission.phoneNumber}</h3>
                            </div>
                            <div>
                                <p style={infoLabel}>Gender</p>
                                <h3 style={infoValue}>{admission.gender}</h3>
                            </div>
                            <div>
                                <p style={infoLabel}>Date of Birth</p>
                                <h3 style={infoValue}>
                                    {new Date(admission.dateOfBirth).toLocaleDateString()}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", // 1 col mobile, 2 col lg
                    gap: "1.5rem" // gap-6
                }}
            >
                {/* Admission Information */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", margin: "0 0 1.5rem 0", color: "#0f172a" }}>
                        Admission Information
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <p style={{ margin: 0, color: "#334155" }}>
                            <strong>Class Applying For:</strong>{" "}{admission.classApplyingFor}
                        </p>
                        <p style={{ margin: 0, color: "#334155" }}>
                            <strong>Admission Code:</strong>{" "}{admission.admissionCode || "-"}
                        </p>
                        <p style={{ margin: 0, color: "#334155" }}>
                            <strong>Reviewed At:</strong>{" "}
                            {admission.reviewedAt
                              ? new Date(admission.reviewedAt).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>
                </div>

                {/* Parent Information */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", margin: "0 0 1.5rem 0", color: "#0f172a" }}>
                        Parent Information
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <p style={{ margin: 0, color: "#334155" }}>
                            <strong>Name:</strong>{" "}{admission.parentName}
                        </p>
                        <p style={{ margin: 0, color: "#334155" }}>
                            <strong>Phone:</strong>{" "}{admission.parentPhone}
                        </p>
                    </div>
                </div>

                {/* Remarks */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", margin: "0 0 1.5rem 0", color: "#0f172a" }}>
                        Remarks
                    </h2>
                    <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
                        {admission.remarks || "No remarks yet."}
                    </p>
                </div>

                {/* Uploaded Documents */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", margin: "0 0 1.5rem 0", color: "#0f172a" }}>
                        Uploaded Documents
                    </h2>
                    {admission.documents?.length? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {admission.documents.map((doc) => (
                                <a
                                    key={doc.publicId}
                                    href={doc.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
                                    style={{
                                        display: "block",
                                        color: "#2563eb",
                                        fontWeight: 500,
                                        textDecoration: "none",
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {doc.name || "Document"}
                                </a>
                            ))}
                        </div>
                    ) : (
                        <p style={{ margin: 0, color: "#64748b" }}>No documents uploaded.</p>
                    )}
                </div>
            </div>
        </div>
    );
}