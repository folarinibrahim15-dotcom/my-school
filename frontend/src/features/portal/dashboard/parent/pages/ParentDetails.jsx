import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetParentQuery, useGetParentsQuery } from "../../../../../redux/api/parentApi";

export default function ParentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const { data, isLoading, isError } = useGetParentQuery(id);

    if (isLoading) {
        return (
            <div style={{ padding: "clamp(20px, 5vw, 32px)", textAlign: "center", color: "#64748b" }}>
                Loading Parent...
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ padding: "clamp(20px, 5vw, 32px)", textAlign: "center", color: "#b91c1c" }}>
                Unable to load parent.
            </div>
        );
    }

    const parent = data.data;

    const cardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-3xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(20px, 4vw, 32px)", // responsive p-8
        boxSizing: "border-box"
    };

    const infoCardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1rem", // rounded-2xl
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        padding: "1.5rem", // p-6
        boxSizing: "border-box"
    };

    const labelStyle = {
        color: "#64748b",
        fontSize: "0.875rem",
        margin: 0,
        fontWeight: 500
    };

    const valueStyle = {
        fontWeight: "600",
        color: "#0f172a",
        margin: "0.25rem 0 0 0",
        fontSize: "1.05rem",
        wordBreak: "break-word"
    };

    const buttonPrimary = {
        backgroundColor: "#1d4ed8",
        color: "#ffffff",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.75rem",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)",
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
                maxWidth: "80rem",
                margin: "0 auto",
                padding: "clamp(16px, 4vw, 24px)",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                boxSizing: "border-box"
            }}
        >
            {/* Profile Header */}
            <div style={cardStyle}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: isDesktop ? "row" : "column",
                        gap: "2rem"
                    }}
                >
                    {/* Parent Photo */}
                    <div style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
                        <img
                            src={
                                parent.profilePhoto ||
                                `https://ui-avatars.com/api/?name=${parent.firstName}+${parent.lastName}&size=300`
                            }
                            alt={parent.firstName}
                            style={{
                                width: "13rem",
                                height: "13rem",
                                borderRadius: "1.5rem",
                                objectFit: "cover",
                                border: "3px solid #f1f5f9",
                                boxShadow: "0 8px 24px rgba(15,23,42,0.08)"
                            }}
                        />
                    </div>

                    {/* Parent Info */}
                    <div style={{ flex: "1 1 0%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                            <div>
                                <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.25rem)", fontWeight: "700", color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
                                    {parent.firstName} {parent.lastName}
                                </h1>
                                <p style={{ marginTop: "0.5rem", color: "#64748b", fontSize: "0.95rem" }}>
                                    {parent.relationship}
                                </p>
                            </div>
                            <span
                                style={{
                                    padding: "0.5rem 1rem",
                                    borderRadius: "9999px",
                                    fontSize: "0.875rem",
                                    fontWeight: "700",
                                    backgroundColor: parent.isActive ? "#dcfce7" : "#fee2e2",
                                    color: parent.isActive ? "#15803d" : "#b91c1c"
                                }}
                            >
                                {parent.isActive ? "Active Parent" : "Inactive"}
                            </span>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
                            <div>
                                <p style={labelStyle}>Email</p>
                                <h3 style={{ ...valueStyle, wordBreak: "break-all" }}>{parent.email}</h3>
                            </div>
                            <div>
                                <p style={labelStyle}>Phone</p>
                                <h3 style={valueStyle}>{parent.phoneNumber}</h3>
                            </div>
                            <div>
                                <p style={labelStyle}>Occupation</p>
                                <h3 style={valueStyle}>{parent.occupation || "-"}</h3>
                            </div>
                            <div>
                                <p style={labelStyle}>Relationship</p>
                                <h3 style={valueStyle}>{parent.relationship}</h3>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                            <button
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; e.currentTarget.style.transform = "translateY(0)"; }}
                                style={buttonPrimary}
                            >
                                Edit Parent
                            </button>
                            <button
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                                style={buttonSecondary}
                            >
                                Print Profile
                            </button>
                            <button
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                                style={buttonSecondary}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                {/* Address */}
                <div style={infoCardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", color: "#0f172a" }}>Address</h2>
                    <p style={{ color: "#334155", lineHeight: 1.7, margin: 0 }}>{parent.address || "No address provided"}</p>
                </div>

                {/* Children */}
                <div style={infoCardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", color: "#0f172a" }}>Children</h2>
                    <h1 style={{ fontSize: "3rem", fontWeight: "700", color: "#1d4ed8", margin: 0, lineHeight: 1 }}>
                        {parent.students?.length || 0}
                    </h1>
                    <p style={{ color: "#64748b", marginTop: "0.5rem", marginBottom: 0 }}>Registered Student(s)</p>
                </div>

                {/* Account */}
                <div style={infoCardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", color: "#0f172a" }}>Account</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <p style={labelStyle}>User Account</p>
                            <h4 style={{ ...valueStyle, wordBreak: "break-all" }}>{parent.user?.email || "No linked account"}</h4>
                        </div>
                        <div>
                            <p style={labelStyle}>Status</p>
                            <h4 style={valueStyle}>{parent.isActive ? "Active" : "Inactive"}</h4>
                        </div>
                    </div>
                </div>

                {/* Registration */}
                <div style={infoCardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", color: "#0f172a" }}>Registration</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <p style={labelStyle}>Created</p>
                            <h4 style={valueStyle}>{new Date(parent.createdAt).toLocaleDateString()}</h4>
                        </div>
                        <div>
                            <p style={labelStyle}>Last Updated</p>
                            <h4 style={valueStyle}>{new Date(parent.updatedAt).toLocaleDateString()}</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Linked Students */}
            <div style={cardStyle}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Linked Students</h2>
                    <span style={{ color: "#64748b", fontWeight: 500 }}>{parent.students?.length || 0} Student(s)</span>
                </div>

                {parent.students?.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "3rem 0", color: "#64748b" }}>
                        No students linked to this parent.
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
                        {parent.students.map((student) => (
                            <div
                                key={student._id}
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "1rem",
                                    padding: "1.5rem",
                                    transition: "all 0.3s ease",
                                    backgroundColor: "#ffffff"
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <img
                                        src={
                                            student.passport ||
                                            `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}`
                                        }
                                        alt={student.firstName}
                                        style={{ width: "4rem", height: "4rem", borderRadius: "50%", objectFit: "cover", border: "2px solid #f1f5f9" }}
                                    />
                                    <div>
                                        <h3 style={{ fontWeight: "700", margin: 0, color: "#0f172a" }}>
                                            {student.firstName} {student.lastName}
                                        </h3>
                                        <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0.25rem 0 0 0" }}>
                                            {student.admissionNumber}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ marginTop: "1.5rem" }}>
                                    <p style={labelStyle}>Class</p>
                                    <h4 style={valueStyle}>{student.class}</h4>
                                </div>

                                <button
                                    onClick={() => navigate(`/portal/dashboard/students/${student._id}`)}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                                    style={{
                                        marginTop: "1.5rem",
                                        width: "100%",
                                        backgroundColor: "#1d4ed8",
                                        color: "#ffffff",
                                        padding: "0.75rem",
                                        borderRadius: "0.75rem",
                                        border: "none",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    View Student Profile
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}