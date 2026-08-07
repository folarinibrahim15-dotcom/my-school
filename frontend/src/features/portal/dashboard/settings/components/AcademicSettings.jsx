import React, { useState } from "react";

export default function AcademicSettings() {
    const [academic, setAcademic] = useState({
        currentSession: "2026/2027",
        currentTerm: "First Term",
        schoolType: "Secondary School",
        gradingSystem: "Percentage",
        passMark: 40,
        promotionPolicy: "Automatic",
        attendancePercentage: 75,
        resumptionDate: "2026-09-08",
        closingDate: "2026-12-18",
    });

    const handleChange = (e) => {
        setAcademic((prev) => ({
           ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(academic);
        alert("Academic settings saved successfully.");
    };

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

    const headerTitle = {
        fontSize: "clamp(1.5rem, 5vw, 1.875rem)", // text-3xl
        fontWeight: "700",
        color: "#1e293b", // slate-800
        margin: 0,
        lineHeight: 1.3
    };

    const headerSub = {
        color: "#64748b", // gray-500
        marginTop: "0.5rem",
        fontSize: "0.95rem",
        lineHeight: 1.6,
        marginBottom: "2.5rem" // mb-10
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // 1 col mobile, 2 col desktop
        gap: "1.5rem" // gap-6
    };

    const formSection = {
        display: "flex",
        flexDirection: "column",
        gap: "2rem" // space-y-8
    };

    const inputBase = {
        width: "100%",
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-xl
        padding: "0.875rem 1rem", // p-3
        fontSize: "0.95rem",
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit",
        lineHeight: 1.6,
        backgroundColor: "#ffffff",
        transition: "all 0.2s ease"
    };

    const label = {
        display: "block",
        fontWeight: "600",
        marginBottom: "0.5rem", // mb-2
        color: "#334155",
        fontSize: "0.95rem"
    };

    const btnSave = {
        backgroundColor: "#1e40af",
        color: "#ffffff",
        padding: "0.75rem 2rem", // px-8 py-3
        borderRadius: "0.75rem", // rounded-xl
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "0.95rem",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(30, 64, 175, 0.25)"
    };

    const focusHandlers = {
        onFocus: (e) => {
            e.target.style.borderColor = "#2563eb";
            e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
        },
        onBlur: (e) => {
            e.target.style.borderColor = "#cbd5e1";
            e.target.style.boxShadow = "none";
        }
    };

    return (
        <div style={wrapper}>
            <div>
                <h2 style={headerTitle}>
                    Academic Settings
                </h2>
                <p style={headerSub}>
                    Configure sessions, terms, grading and promotion policies.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={formSection}>
                <div style={grid}>
                    <div>
                        <label style={label}>Academic Session</label>
                        <input
                            type="text"
                            name="currentSession"
                            value={academic.currentSession}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Current Term</label>
                        <select
                            name="currentTerm"
                            value={academic.currentTerm}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        >
                            <option>First Term</option>
                            <option>Second Term</option>
                            <option>Third Term</option>
                        </select>
                    </div>

                    <div>
                        <label style={label}>School Type</label>
                        <select
                            name="schoolType"
                            value={academic.schoolType}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        >
                            <option>Primary School</option>
                            <option>Secondary School</option>
                            <option>College</option>
                        </select>
                    </div>

                    <div>
                        <label style={label}>Grading System</label>
                        <select
                            name="gradingSystem"
                            value={academic.gradingSystem}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        >
                            <option>Percentage</option>
                            <option>GPA</option>
                            <option>Letter Grade</option>
                        </select>
                    </div>

                    <div>
                        <label style={label}>Pass Mark (%)</label>
                        <input
                            type="number"
                            name="passMark"
                            value={academic.passMark}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                            min="0"
                            max="100"
                        />
                    </div>

                    <div>
                        <label style={label}>Promotion Policy</label>
                        <select
                            name="promotionPolicy"
                            value={academic.promotionPolicy}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        >
                            <option>Automatic</option>
                            <option>Pass Mark Required</option>
                            <option>Principal Approval</option>
                        </select>
                    </div>

                    <div>
                        <label style={label}>Minimum Attendance (%)</label>
                        <input
                            type="number"
                            name="attendancePercentage"
                            value={academic.attendancePercentage}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                            min="0"
                            max="100"
                        />
                    </div>

                    <div>
                        <label style={label}>Resumption Date</label>
                        <input
                            type="date"
                            name="resumptionDate"
                            value={academic.resumptionDate}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>

                    <div>
                        <label style={label}>Closing Date</label>
                        <input
                            type="date"
                            name="closingDate"
                            value={academic.closingDate}
                            onChange={handleChange}
                            style={inputBase}
                            {...focusHandlers}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e3a8a"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                    style={btnSave}
                >
                    Save Academic Settings
                </button>
            </form>
        </div>
    );
}