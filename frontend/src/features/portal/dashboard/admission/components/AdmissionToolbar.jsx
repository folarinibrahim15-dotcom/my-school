import React, { useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass, HiPlus } from "react-icons/hi2";

export default function AdmissionToolbar({
    search,
    setSearch,
    status,
    setStatus,
    classApplyingFor,
    setClassApplyingFor,
    onAdd,
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
        whiteSpace: "nowrap",
        flexShrink: 0
    };

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "1rem", // rounded-2xl
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
                padding: "1.25rem" // p-5
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: isDesktop ? "row" : "column", // STACK VERTICALLY ON MOBILE
                    gap: "1rem", // gap-4
                    alignItems: isDesktop ? "center" : "stretch",
                    justifyContent: "space-between"
                }}
            >
                {/* Left Side: Filters */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: window.innerWidth >= 768 ? "row" : "column", // md:flex-row
                        gap: "1rem",
                        flex: 1,
                        width: "100%"
                    }}
                >
                    {/* Search */}
                    <div style={{ position: "relative", flex: 1 }}>
                        <HiOutlineMagnifyingGlass
                            size={20}
                            style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#94a3b8",
                                pointerEvents: "none"
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search applicant..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                ...inputBaseStyle,
                                paddingLeft: "3rem" // pl-12
                            }}
                            {...focusHandlers}
                        />
                    </div>

                    {/* Status */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                           ...inputBaseStyle,
                            flex: window.innerWidth >= 768 ? "0 0 14rem" : "1 1 100%"
                        }}
                        {...focusHandlers}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Admitted">Admitted</option>
                    </select>

                    {/* Class */}
                    <input
                        type="text"
                        placeholder="Class Applying For"
                        value={classApplyingFor}
                        onChange={(e) => setClassApplyingFor(e.target.value)}
                        style={{
                           ...inputBaseStyle,
                            flex: window.innerWidth >= 768 ? "0 0 16rem" : "1 1 100%"
                        }}
                        {...focusHandlers}
                    />
                </div>

                {/* Add Button */}
                <button
                    onClick={onAdd}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; e.currentTarget.style.transform = "translateY(0)"; }}
                    style={buttonPrimary}
                >
                    <HiPlus size={18} />
                    Add Admission
                </button>
            </div>
        </div>
    );
}