import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";

export default function FinanceToolbar({
    search,
    setSearch,
    status,
    setStatus,
    paymentType,
    setPaymentType,
    onAdd,
}) {
    const inputStyle = {
        border: "1px solid #cbd5e1",
        borderRadius: "0.75rem", // rounded-xl
        padding: "0.75rem 1rem", // px-4 py-3
        fontSize: "0.95rem",
        outline: "none",
        transition: "all 0.2s ease",
        backgroundColor: "#ffffff",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "inherit"
    };

    const focusHandlers = {
        onFocus: (e) => {
            e.target.style.borderColor = "#2563eb";
            e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)"; // focus:ring-2
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
        gap: "0.5rem", // gap-2
        backgroundColor: "#1d4ed8", // bg-blue-700
        color: "#ffffff",
        padding: "0.75rem 1.5rem", // px-6 py-3
        borderRadius: "0.75rem", // rounded-xl
        border: "none",
        fontWeight: "600", // font-semibold
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 14px rgba(29, 78, 216, 0.25)",
        fontSize: "0.95rem",
        whiteSpace: "nowrap",
        flexShrink: 0
    };

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                borderRadius: "1.5rem", // rounded-2xl
                border: "1px solid #e5e7eb", // border-gray-200
                boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow-sm premium
                padding: "1.5rem" // p-6
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column", // mobile: column
                    gap: "1rem", // gap-4
                }}
            >
                {/* Left Side: Filters */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column", // mobile: column
                        gap: "1rem",
                        flex: 1,
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search Student or Receipt..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            ...inputStyle,
                            maxWidth: "320px" // md:w-80
                        }}
                        {...focusHandlers}
                    />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column", // mobile: column
                            gap: "1rem",
                            width: "100%"
                        }}
                    >
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={inputStyle}
                            {...focusHandlers}
                        >
                            <option value="">All Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                        </select>

                        <select
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                            style={inputStyle}
                            {...focusHandlers}
                        >
                            <option value="">All Payment Types</option>
                            <option value="School Fees">School Fees</option>
                            <option value="Admission Fees">Admission Fees</option>
                            <option value="Examination Fees">Examination Fees</option>
                            <option value="Transport">Transport</option>
                            <option value="Hostel">Hostel</option>
                            <option value="Uniform">Uniform</option>
                            <option value="Books">Books</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Right Side: Add Button */}
                <button
                    onClick={onAdd}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1e40af"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1d4ed8"; e.currentTarget.style.transform = "translateY(0)"; }}
                    style={buttonPrimary}
                >
                    <HiOutlinePlus size={20} />
                    Add Payment
                </button>
            </div>

            {/* Desktop Layout Override */}
            <style>{`
                @media (min-width: 768px) {
                    /* md: row for selects */
                    .finance-toolbar-left { flex-direction: row !important; }
                    .finance-toolbar-selects { flex-direction: row !important; }
                }
                @media (min-width: 1024px) {
                    /* lg: row for whole toolbar + space between */
                    .finance-toolbar { flex-direction: row !important; align-items: center !important; justify-content: space-between !important; }
                }
            `}</style>
            <script dangerouslySetInnerHTML={{__html: `
                document.currentScript.previousElementSibling.previousElementSibling.classList.add('finance-toolbar');
                document.currentScript.previousElementSibling.previousElementSibling.firstElementChild.classList.add('finance-toolbar-left');
                document.currentScript.previousElementSibling.previousElementSibling.firstElementChild.lastElementChild.classList.add('finance-toolbar-selects');
            `}} />
        </div>
    );
}