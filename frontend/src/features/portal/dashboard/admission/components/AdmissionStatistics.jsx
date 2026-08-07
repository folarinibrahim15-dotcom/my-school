import React from "react";
import {
    HiOutlineClipboardDocumentList,
    HiOutlineClock,
    HiOutlineCheckCircle,
    HiOutlineXCircle,
} from "react-icons/hi2";

export default function AdmissionStatistics({
    admissions = [],
}) {
    const total = admissions.length;
    const pending = admissions.filter((admission) => admission.status === "Pending").length;
    const approved = admissions.filter((admission) => admission.status === "Approved").length;
    const rejected = admissions.filter((admission) => admission.status === "Rejected").length;

    const cards = [
        {
            title: "Total Applications",
            value: total,
            icon: HiOutlineClipboardDocumentList,
            bg: "#1d4ed8", // bg-blue-600
        },
        {
            title: "Pending",
            value: pending,
            icon: HiOutlineClock,
            bg: "#eab308", // bg-yellow-500
        },
        {
            title: "Approved",
            value: approved,
            icon: HiOutlineCheckCircle,
            bg: "#16a34a", // bg-green-600
        },
        {
            title: "Rejected",
            value: rejected,
            icon: HiOutlineXCircle,
            bg: "#dc2626", // bg-red-600
        },
    ];

    const cardBaseStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "1rem", // rounded-2xl
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        padding: "1.5rem", // p-6
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
        width: "100%"
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", // 1 col mobile, 2 col sm, 4 col xl
                gap: "1.5rem" // gap-6
            }}
        >
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <div
                        key={card.title}
                        style={cardBaseStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.12)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "0 4px 18px rgba(15, 23, 42, 0.06)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    color: "#64748b", // text-gray-500
                                    fontSize: "0.875rem", // text-sm
                                    margin: 0,
                                    fontWeight: 500
                                }}
                            >
                                {card.title}
                            </p>
                            <h2
                                style={{
                                    fontSize: "clamp(1.75rem, 4vw, 1.875rem)", // text-3xl responsive
                                    fontWeight: "700",
                                    color: "#0f172a",
                                    margin: "0.5rem 0 0 0",
                                    lineHeight: 1.2
                                }}
                            >
                                {card.value.toLocaleString()}
                            </h2>
                        </div>

                        <div
                            style={{
                                height: "3.5rem", // h-14
                                width: "3.5rem", // w-14
                                borderRadius: "1rem", // rounded-2xl
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: card.bg,
                                color: "#ffffff",
                                flexShrink: 0
                            }}
                        >
                            <Icon size={28} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}