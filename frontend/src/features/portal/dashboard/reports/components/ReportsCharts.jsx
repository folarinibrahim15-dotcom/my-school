import React from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid
} from "recharts";

export default function ReportsCharts({
    students = {},
    finance = {},
    admissions = {},
    academic = {}
}) {

    const COLORS = ["#2563eb", "#16a34a", "#eab308", "#9333ea", "#dc2626", "#0ea5e9"];

    const genderData =
        students.studentsByGender?.map(item => ({
            name: item._id,
            value: item.total
        })) || [];

    const paymentData =
        finance.paymentStatus?.map(item => ({
            name: item._id,
            value: item.total
        })) || [];

    const admissionData =
        admissions.admissionStatus?.map(item => ({
            name: item._id,
            value: item.total
        })) || [];

    const subjectData =
        academic.subjectPerformance?.map(item => ({
            name: item._id,
            average: Number(item.average.toFixed(2))
        })) || [];

    const grid = {
        display: "grid",
        gridTemplateColumns: "1fr", // default mobile = 1 column vertical
        gap: "1.5rem", // gap-6
        width: "100%"
    };

    const gridDesktop = `
        @media (min-width: 1024px) {
            .reports-grid {
                grid-template-columns: repeat(2, 1fr) !important; /* xl: 2 columns */
            }
        }
    `;

    const card = {
        backgroundColor: "#ffffff",
        borderRadius: "1.5rem", // rounded-2xl
        boxShadow: "0 4px 18px rgba(15, 23, 42, 0.06)",
        border: "1px solid #e5e7eb",
        padding: "clamp(18px, 4vw, 1.5rem)", // p-6 responsive
        height: "clamp(18rem, 50vw, 20rem)", // h-80 but responsive for mobile
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    const title = {
        fontSize: "clamp(1.125rem, 4vw, 1.25rem)", // text-xl
        fontWeight: "700",
        color: "#334155", // text-gray-700
        margin: 0,
        marginBottom: "1rem" // mb-4
    };

    const tooltipStyle = {
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem",
        padding: "0.75rem",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        fontSize: "0.9rem"
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={tooltipStyle}>
                    <p style={{ margin: 0, fontWeight: 600, color: "#0f172a" }}>{label}</p>
                    {payload.map((pld, i) => (
                        <p key={i} style={{ margin: "0.25rem 0 0 0", color: "#334155" }}>
                            {pld.name}: <b>{pld.value.toLocaleString()}</b>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <style>{gridDesktop}</style>
            <div className="reports-grid" style={grid}>

                {/* Student Distribution */}
                <div style={card}>
                    <h2 style={title}>Student Distribution</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={genderData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={80}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: "12px" }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Payment Status */}
                <div style={card}>
                    <h2 style={title}>Payment Status</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={paymentData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} angle={-15} />
                            <YAxis stroke="#64748b" fontSize={11} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Admissions Status */}
                <div style={card}>
                    <h2 style={title}>Admissions Status</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={admissionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} angle={-15} />
                            <YAxis stroke="#64748b" fontSize={11} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" fill="#16a34a" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Subject Performance */}
                <div style={card}>
                    <h2 style={title}>Subject Performance</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={subjectData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} angle={-15} />
                            <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line 
                                type="monotone" 
                                dataKey="average" 
                                stroke="#9333ea" 
                                strokeWidth={3}
                                dot={{ r: 4, fill: "#9333ea" }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </>
    );
}