import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTeacherQuery } from "../../../../../redux/api/teacherApi";

export default function TeacherDetails() {
    const { id } = useParams();
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const { data, isLoading, isError } = useGetTeacherQuery(id);

    if (isLoading) {
        return (
            <div style={{ padding: "clamp(20px, 5vw, 32px)", textAlign: "center", color: "#64748b" }}>
                Loading teacher...
            </div>
        );
    }

    if (isError) {
        return (
            <div style={{ padding: "clamp(20px, 5vw, 32px)", textAlign: "center", color: "#b91c1c" }}>
                Unable to load teacher.
            </div>
        );
    }

    const teacher = data?.data;

    if (!teacher) {
        return (
            <div style={{ padding: "clamp(20px, 5vw, 32px)", textAlign: "center", color: "#64748b" }}>
                Teacher not found.
            </div>
        );
    }

    const cardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-3xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(20px, 4vw, 32px)",
        boxSizing: "border-box"
    };

    const infoCardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1rem", // rounded-2xl
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        padding: "1.5rem",
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
            {/* Header Card */}
            <div style={cardStyle}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: isDesktop ? "row" : "column",
                        gap: "2rem"
                    }}
                >
                    {/* Passport */}
                    <div style={{ display: "flex", justifyContent: "center", flexShrink: 0 }}>
                        <img
                            src={
                                teacher.passport ||
                                `https://ui-avatars.com/api/?name=${teacher.firstName}+${teacher.lastName}&size=300`
                            }
                            alt={teacher.firstName}
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

                    {/* Information */}
                    <div style={{ flex: "1 1 0%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                            <div>
                                <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.25rem)", fontWeight: "700", color: "#0f172a", margin: 0, lineHeight: 1.2 }}>
                                    {teacher.firstName} {teacher.lastName}
                                </h1>
                                <p style={{ marginTop: "0.5rem", color: "#64748b", fontSize: "0.95rem" }}>
                                    Employee ID: <span style={{ fontWeight: 600 }}>{teacher.employeeId}</span>
                                </p>
                            </div>

                            <span
                                style={{
                                    padding: "0.5rem 1rem",
                                    borderRadius: "9999px",
                                    fontSize: "0.875rem",
                                    fontWeight: "700",
                                    backgroundColor: teacher.status === "Active" ? "#dcfce7" : "#fee2e2",
                                    color: teacher.status === "Active" ? "#15803d" : "#b91c1c"
                                }}
                            >
                                {teacher.status}
                            </span>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "2rem" }}>
                            <div>
                                <p style={labelStyle}>Specialization</p>
                                <h3 style={valueStyle}>{teacher.specialization || "-"}</h3>
                            </div>
                            <div>
                                <p style={labelStyle}>Phone Number</p>
                                <h3 style={valueStyle}>{teacher.phoneNumber}</h3>
                            </div>
                            <div>
                                <p style={labelStyle}>Email</p>
                                <h3 style={{ ...valueStyle, wordBreak: "break-all" }}>{teacher.email}</h3>
                            </div>
                            <div>
                                <p style={labelStyle}>Gender</p>
                                <h3 style={valueStyle}>{teacher.gender}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                <div style={infoCardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", color: "#0f172a" }}>
                        Specialization
                    </h2>
                    <span
                        style={{
                            display: "inline-block",
                            backgroundColor: "#dbeafe", // bg-blue-100
                            color: "#1d4ed8", // text-blue-700
                            padding: "0.5rem 1rem",
                            borderRadius: "9999px",
                            fontWeight: "600",
                            fontSize: "0.9rem"
                        }}
                    >
                        {teacher.specialization || "Not Assigned"}
                    </span>
                </div>

                <div style={infoCardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", color: "#0f172a" }}>
                        Qualification
                    </h2>
                    <p style={{ color: "#334155", margin: 0, lineHeight: 1.7 }}>
                        {teacher.qualification || "Not Available"}
                    </p>
                </div>

                <div style={infoCardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", color: "#0f172a" }}>
                        Address
                    </h2>
                    <p style={{ color: "#334155", margin: 0, lineHeight: 1.7 }}>
                        {teacher.address || "Not Available"}
                    </p>
                </div>

                <div style={infoCardStyle}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem", color: "#0f172a" }}>
                        Employment Date
                    </h2>
                    <p style={{ color: "#334155", margin: 0, lineHeight: 1.7 }}>
                        {teacher.employmentDate
                            ? new Date(teacher.employmentDate).toLocaleDateString()
                            : "Not Available"}
                    </p>
                </div>
            </div>
        </div>
    );
}