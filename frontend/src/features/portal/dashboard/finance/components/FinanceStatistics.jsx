import React, { useMemo } from "react";
import {
    HiOutlineCurrencyDollar,
    HiOutlineDocumentChartBar,
    HiOutlineTag,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineDocumentText,
} from "react-icons/hi2";
import { useGetPaymentsQuery } from "../../../../../redux/api/paymentApi";
import { useGetDashboardStatsQuery } from "../../../../../redux/api/dashboardApi";

export default function FinanceStatistics({ dashboard: propDashboard = {}, payments: propPayments = [] }) {
    const { data: statsData } = useGetDashboardStatsQuery();
    const { data: paymentsApiData } = useGetPaymentsQuery({ limit: 2000 });

    const dashboard = useMemo(() => {
        const f = statsData?.data || statsData || {};
        return { ...f, ...(f.data || {}), ...(propDashboard || {}) };
    }, [statsData, propDashboard]);

    const allPayments = useMemo(() => {
        let all = [...(propPayments || [])];
        const apiList = paymentsApiData?.payments || paymentsApiData?.data || paymentsApiData || [];
        if (Array.isArray(apiList)) all = [...all, ...apiList];
        if (dashboard.payments) all = [...all, ...dashboard.payments];
        if (dashboard.recentPayments) all = [...all, ...dashboard.recentPayments];
        return Array.from(new Map(all.filter(Boolean).map(p => [p._id, p])).values());
    }, [propPayments, paymentsApiData, dashboard]);

    const isPaid = (p) => ["Paid", "Successful", "Success", "Completed"].includes(p.status || p.paymentStatus);
    const normalize = (p) => (p.paymentType || p.feeType || p.category || p.type || "General").toLowerCase();

    // 1. TOTAL REVENUE - DB
    const totalRevenue = Number(
        dashboard?.totalRevenue || allPayments.filter(isPaid).reduce((s, p) => s + Number(p.amount || 0), 0) || 0
    );

    // 2. ADMISSION FEES - DB (any category containing admission/application/form)
    const admissionFees = allPayments
        .filter(isPaid)
        .filter(p => {
            const t = normalize(p);
            return t.includes("admission") || t.includes("application") || t.includes("form");
        })
        .reduce((s, p) => s + Number(p.amount || 0), 0);

    const admissionTotal = Number(dashboard?.admissionFeesTotal || dashboard?.totalAdmissionFees || admissionFees || 0);

    // 3. OTHER FEES - THIS REPLACES UNIFORM - CARRIES ALL OTHER CATEGORIES
    // School Fee + Uniform + Exam + Bus + Tuition + Any category you create
    const otherFees = allPayments
        .filter(isPaid)
        .filter(p => {
            const t = normalize(p);
            return !(t.includes("admission") || t.includes("application") || t.includes("form"));
        })
        .reduce((s, p) => s + Number(p.amount || 0), 0);

    const otherFeesTotal = Number(
        dashboard?.otherFeesTotal || dashboard?.schoolFeesTotal || otherFees || totalRevenue - admissionTotal || 0
    );

    // 4. PAID, 5. PENDING, 6. RECEIPTS
    const paid = dashboard?.totalPaid || allPayments.filter(isPaid).length;
    const pending = dashboard?.totalPending || allPayments.filter(p => p.status === "Pending").length;
    const receipts = dashboard?.totalReceipts || allPayments.filter(p => isPaid(p)).length;

    // ORDER YOU REQUESTED
    const cards = [
        {
            title: "Total Revenue",
            value: `₦${totalRevenue.toLocaleString()}`,
            sub: `${allPayments.length} transactions from DB`,
            bg: "#9333ea",
            icon: <HiOutlineCurrencyDollar size={28} />,
        },
        {
            title: "Admission Fees",
            value: `₦${admissionTotal.toLocaleString()}`,
            sub: `${allPayments.filter(p => normalize(p).includes("admission") || normalize(p).includes("application")).filter(isPaid).length} payments`,
            bg: "#ea580c",
            icon: <HiOutlineDocumentChartBar size={28} />,
        },
        {
            title: "Other Fees", // REPLACES UNIFORM - CARRIES ALL CATEGORIES
            value: `₦${otherFeesTotal.toLocaleString()}`,
            sub: `School, Uniform, Exam & ${Object.keys(
                allPayments
                    .filter(isPaid)
                    .filter(p => !normalize(p).includes("admission") && !normalize(p).includes("application"))
                    .reduce((acc, p) => {
                        const cat = (p.paymentType || p.feeType || p.category || "General").trim();
                        acc[cat] = true;
                        return acc;
                    }, {})
            ).length} categories`,
            bg: "#2563eb",
            icon: <HiOutlineTag size={28} />,
        },
        {
            title: "Paid",
            value: paid,
            sub: "Successful payments",
            bg: "#16a34a",
            icon: <HiOutlineCheckCircle size={28} />,
        },
        {
            title: "Pending",
            value: pending,
            sub: "Awaiting confirmation",
            bg: "#eab308",
            icon: <HiOutlineClock size={28} />,
        },
        {
            title: "Receipts",
            value: receipts,
            sub: "Issued & tracked",
            bg: "#7c3aed",
            icon: <HiOutlineDocumentText size={28} />,
        },
    ];

    const gridResponsive = `@media (min-width: 768px){.stats-grid{grid-template-columns:repeat(2,1fr)!important;}} @media (min-width:1280px){.stats-grid{grid-template-columns:repeat(3,1fr)!important;}}`;

    return (
        <>
            <style>{gridResponsive}</style>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
                {cards.map(c => (
                    <div
                        key={c.title}
                        style={{
                            background: "#ffffff",
                            borderRadius: "1.5rem",
                            border: "1px solid #e5e7eb",
                            padding: "1.5rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxShadow: "0 4px 18px rgba(15,23,42,0.06)",
                        }}
                    >
                        <div>
                            <p style={{ color: "#64748b", fontSize: "0.875rem", margin: 0, fontWeight: "500" }}>{c.title}</p>
                            <h2 style={{ fontSize: "1.75rem", fontWeight: "800", marginTop: "0.5rem", color: "#0f172a", marginBottom: 0 }}>{c.value}</h2>
                            <p style={{ color: "#94a3b8", fontSize: "0.75rem", margin: "4px 0 0 0" }}>{c.sub}</p>
                        </div>
                        <div style={{ background: c.bg, color: "#fff", padding: "0.9rem", borderRadius: "0.9rem", display: "flex" }}>{c.icon}</div>
                    </div>
                ))}
            </div>
        </>
    );
}