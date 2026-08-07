import React, { useEffect, useState } from "react";
import {
    HiMagnifyingGlass,
    HiAdjustmentsHorizontal,
    HiArrowDownTray,
    HiPlus,
} from "react-icons/hi2";

export default function TeacherToolbar({
    onAddTeacher,
    search,
    setSearch,
    department,
    setDepartment,
    status,
    setStatus,
}) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const inputBaseStyle = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-xl
        padding: "0.75rem 1rem", // py-3 px-4
        fontSize: "0.95rem",
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit",
        height: "48px"
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

    const buttonSecondary = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.75rem 1.25rem", // px-5 py-3
        borderRadius: "0.75rem",
        border: "1px solid #cbd5e1",
        backgroundColor: "#ffffff",
        color: "#334155",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontSize: "0.95rem",
        height: "48px",
        flex: "1 1 auto",
        minWidth: "120px"
    };

    const buttonPrimary = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        backgroundColor: "#1d4ed8",
        color: "#ffffff",
        padding: "0.75rem 1.5rem", // px-6 py-3
        borderRadius: "0.75rem",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)",
        fontSize: "0.95rem",
        height: "48px",
        flex: "1 1 auto",
        minWidth: "140px"
    };

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem", // rounded-2xl
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
                padding: "clamp(20px, 4vw, 24px)", // p-6 responsive
                boxSizing: "border-box"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: isDesktop ? "row" : "column",
                    alignItems: isDesktop ? "center" : "stretch",
                    justifyContent: "space-between",
                    gap: "1.25rem" // gap-5
                }}
            >
                {/* Left */}
                <div style={{ flexShrink: 0 }}>
                    <h1
                        style={{
                            fontSize: "clamp(1.5rem, 4vw, 1.875rem)", // text-3xl responsive
                            fontWeight: "700",
                            color: "#0f172a",
                            margin: 0,
                            lineHeight: 1.2
                        }}
                    >
                        Teachers
                    </h1>
                    <p
                        style={{
                            marginTop: "0.5rem",
                            color: "#64748b",
                            fontSize: "0.95rem",
                            margin: "0.5rem 0 0 0"
                        }}
                    >
                        Manage all teachers within the school.
                    </p>
                </div>

                {/* Right - Controls */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: isDesktop ? "row" : "column", // STACK VERTICALLY ON MOBILE
                        flexWrap: "wrap",
                        gap: "0.75rem", // gap-3
                        width: "100%",
                        flex: isDesktop ? "0 1 auto" : "1 1 auto"
                    }}
                >
                    {/* Search */}
                    <div style={{ position: "relative", flex: isDesktop ? "0 0 18rem" : "1 1 100%" }}>
                        <HiMagnifyingGlass
                            style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#94a3b8",
                                fontSize: "1.25rem",
                                pointerEvents: "none"
                            }}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search teacher..."
                            style={{
                                ...inputBaseStyle,
                                paddingLeft: "3rem", // pl-12
                                paddingRight: "1rem"
                            }}
                            {...focusHandlers}
                        />
                    </div>

                    {/* Department */}
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        style={{ ...inputBaseStyle, flex: isDesktop ? "0 0 14rem" : "1 1 100%" }}
                        {...focusHandlers}
                    >
                        <option value="">All Departments</option>
                        <option value="Science">Science</option>
                        <option value="Arts">Arts</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Primary">Primary</option>
                    </select>

                    {/* Status */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ ...inputBaseStyle, flex: isDesktop ? "0 0 12rem" : "1 1 100%" }}
                        {...focusHandlers}
                    >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    {/* Filter */}
                    <button
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                        style={buttonSecondary}
                    >
                        <HiAdjustmentsHorizontal size={18} />
                        Filters
                    </button>

                    {/* Export */}
                    <button
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                        style={buttonSecondary}
                    >
                        <HiArrowDownTray size={18} />
                        Export
                    </button>

                    {/* Add Teacher */}
                    <button
                        onClick={onAddTeacher}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; e.currentTarget.style.transform = "translateY(0)"; }}
                        style={buttonPrimary}
                    >
                        <HiPlus size={18} />
                        Add Teacher
                    </button>
                </div>
            </div>
        </div>
    );
}