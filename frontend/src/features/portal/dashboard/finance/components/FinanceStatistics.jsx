import React from "react";
import {
    HiCurrencyDollar,
    HiClock,
    HiCheckCircle,
    HiXCircle,
} from "react-icons/hi2";

export default function FinanceStatistics({
    payments = [],
}) {
    const totalRevenue = payments
        .filter((p) => p.status === "Paid")
        .reduce((sum, p) => sum + Number(p.amount || 0), 0);

    const pendingPayments = payments.filter(
        (p) => p.status === "Pending"
    ).length;

    const failedPayments = payments.filter(
        (p) => p.status === "Failed"
    ).length;

    const refundedPayments = payments.filter(
        (p) => p.status === "Refunded"
    ).length;

    const paidCount = payments.filter((p) => p.status === "Paid").length;

    const cards = [
        {
            title: "Total Revenue",
            value: `₦${totalRevenue.toLocaleString()}`,
            bg: "#dcfce7", // bg-green-100
            icon: <HiCurrencyDollar size={28} />,
            iconColor: "#16a34a", // text-green-600
        },
        {
            title: "Pending",
            value: pendingPayments,
            bg: "#fef9c3", // bg-yellow-100
            icon: <HiClock size={28} />,
            iconColor: "#ca8a04", // text-yellow-600
        },
        {
            title: "Paid",
            value: paidCount,
            bg: "#dbeafe", // bg-blue-100
            icon: <HiCheckCircle size={28} />,
            iconColor: "#2563eb", // text-blue-600
        },
        {
            title: "Failed",
            value: failedPayments,
            bg: "#fee2e2", // bg-red-100
            icon: <HiXCircle size={28} />,
            iconColor: "#dc2626", // text-red-600
        },
        {
            title: "Refunded",
            value: refundedPayments,
            bg: "#f3e8ff", // bg-purple-100
            icon: <HiXCircle size={28} />,
            iconColor: "#9333ea", // text-purple-600
        },
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", // 1 col mobile, 2 col md, 4 col xl
                gap: "1.5rem" // gap-6
            }}
        >
            {cards.map((card) => (
                <div
                    key={card.title}
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "1.5rem", // rounded-2xl
                        border: "1px solid #e5e7eb", // border
                        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)", // shadow-sm premium
                        padding: "1.5rem", // p-6
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.1)";
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
                                fontWeight: "500"
                            }}
                        >
                            {card.title}
                        </p>
                        <h2
                            style={{
                                fontSize: "clamp(1.875rem, 4vw, 2.25rem)", // text-3xl responsive
                                fontWeight: "700",
                                marginTop: "0.5rem", // mt-2
                                margin: "0.5rem 0 0 0",
                                color: "#0f172a"
                            }}
                        >
                            {card.value}
                        </h2>
                    </div>

                    <div
                        style={{
                            width: "3.5rem", // w-14
                            height: "3.5rem", // h-14
                            borderRadius: "50%", // rounded-full
                            backgroundColor: card.bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}
                    >
                        <span style={{ color: card.iconColor }}>
                            {card.icon}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}