import React, { useState, useEffect } from "react";
import {
    HiMagnifyingGlass,
    HiArrowDownTray,
    HiPlus,
} from "react-icons/hi2";

export default function ParentToolbar({
    onAddParent,
    search,
    setSearch,
    relationship,
    setRelationship,
    gender,
    setGender,
    occupation,
    setOccupation,
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
        lineHeight: 1.6,
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff",
        width: "100%",
        boxSizing: "border-box"
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
        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "1rem", // rounded-2xl
                border: "1px solid #e5e7eb", // border-gray-200
                boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)", // shadow-sm
                padding: "clamp(20px, 4vw, 24px)", // p-6 with breathing room
                margin: "clamp(12px, 3vw, 24px)", // page wrapper spacing so it never touches edges
                width: "auto",
                boxSizing: "border-box"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: isDesktop ? "row" : "column", // stacks vertically on mobile
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
                            color: "#0f172a", // text-gray-900
                            margin: 0,
                            lineHeight: 1.2
                        }}
                    >
                        Parents
                    </h1>
                    <p
                        style={{
                            marginTop: "0.5rem", // mt-2
                            color: "#64748b", // text-gray-500
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                            margin: "0.5rem 0 0 0"
                        }}
                    >
                        Manage all parents and guardians within the school.
                    </p>
                </div>

                {/* Right */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.75rem", // gap-3
                        alignItems: "center",
                        width: "100%",
                        maxWidth: isDesktop ? "auto" : "100%"
                    }}
                >
                    {/* Search */}
                    <div style={{ position: "relative", flex: isDesktop ? "0 0 18rem" : "1 1 100%" }}> {/* w-72 */}
                        <HiMagnifyingGlass
                            style={{
                                position: "absolute",
                                left: "1rem", // left-4
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#94a3b8", // text-gray-400
                                fontSize: "1.25rem" // text-xl
                            }}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search parent name or email."
                            style={{
                                ...inputBaseStyle,
                                paddingLeft: "3rem", // pl-12
                                paddingRight: "1rem"
                            }}
                            {...focusHandlers}
                        />
                    </div>

                    {/* Relationship Filter */}
                    <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        style={{ ...inputBaseStyle, flex: isDesktop ? "0 0 auto" : "1 1 100%" }}
                        {...focusHandlers}
                    >
                        <option value="">Relationship</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                    </select>

                    {/* Gender Filter */}
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        style={{ ...inputBaseStyle, flex: isDesktop ? "0 0 auto" : "1 1 100%" }}
                        {...focusHandlers}
                    >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    {/* Occupation Filter */}
                    <select
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        style={{ ...inputBaseStyle, flex: isDesktop ? "0 0 auto" : "1 1 100%" }}
                        {...focusHandlers}
                    >
                        <option value="">Occupation</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Business Owner">Business Owner</option>
                        <option value="Driver">Driver</option>
                        <option value="Civil Servant">Civil Servant</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Export */}
                    <button
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem", // gap-2
                            padding: "0.75rem 1.25rem", // px-5 py-3
                            borderRadius: "0.75rem", // rounded-xl
                            border: "1px solid #cbd5e1",
                            backgroundColor: "#ffffff",
                            color: "#334155",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            flex: isDesktop ? "0 0 auto" : "1 1 100%",
                            justifyContent: "center"
                        }}
                    >
                        <HiArrowDownTray />
                        Export
                    </button>

                    {/* Add Parent */}
                    <button
                        onClick={onAddParent}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem", // gap-2
                            backgroundColor: "#1d4ed8", // bg-blue-700
                            color: "#ffffff",
                            padding: "0.75rem 1.5rem", // px-6 py-3
                            borderRadius: "0.75rem", // rounded-xl
                            border: "none",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)",
                            flex: isDesktop ? "0 0 auto" : "1 1 100%",
                            justifyContent: "center"
                        }}
                    >
                        <HiPlus />
                        Add Parent
                    </button>
                </div>
            </div>
        </div>
    );
}