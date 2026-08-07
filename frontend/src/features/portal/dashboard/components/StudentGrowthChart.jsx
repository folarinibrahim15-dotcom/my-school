import React from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [

    { month: "Jan", students: 880 },

    { month: "Feb", students: 930 },

    { month: "Mar", students: 980 },

    { month: "Apr", students: 1050 },

    { month: "May", students: 1110 },

    { month: "Jun", students: 1245 },

];

export default function StudentGrowthChart() {

    return (
    <div
        style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem', // rounded-2xl
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)', // softer shadow for premium feel
            padding: '1.5rem', // p-6
            margin: '1.5rem', // add space on all sides so it never touches screen edges
            border: '1px solid #f1f5f9', // subtle border for depth
            maxWidth: '100%',
            boxSizing: 'border-box'
        }}
    >
        <h2
            style={{
                fontSize: '1.25rem', // text-xl
                fontWeight: '600', // font-semibold
                marginBottom: '1.5rem', // mb-6
                color: '#1e293b', // dark slate for contrast
                lineHeight: '1.6',
                letterSpacing: '-0.01em'
            }}
        >
            Student Growth
        </h2>

        <ResponsiveContainer width="100%" height={300} style={{ width: '100%', maxWidth: '100%' }}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                />
                <YAxis 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.75rem',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: '#1e293b'
                    }}
                    cursor={{ strokeDasharray: '3 3', stroke: '#94a3b8' }}
                />
                <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#2563eb" // brand blue
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#ffffff', stroke: '#2563eb' }}
                    activeDot={{ r: 6, strokeWidth: 2, fill: '#2563eb' }}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

}