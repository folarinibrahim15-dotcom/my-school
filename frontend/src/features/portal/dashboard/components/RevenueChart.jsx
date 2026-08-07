import React from "react";

import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

} from "recharts";

const data = [

    { month: "Jan", revenue: 12 },

    { month: "Feb", revenue: 15 },

    { month: "Mar", revenue: 17 },

    { month: "Apr", revenue: 14 },

    { month: "May", revenue: 18 },

    { month: "Jun", revenue: 19 },

];

export default function RevenueChart() {

    return (
    <div
        style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem', // rounded-2xl
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)', // subtle depth
            padding: '1.5rem', // p-6
            margin: '1.5rem', // space on all sides so it never touches screen
            border: '1px solid #f1f5f9',
            maxWidth: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem' // space between title and chart
        }}
    >
        <h2
            style={{
                fontSize: '1.25rem', // text-xl
                fontWeight: '600', // font-semibold
                margin: '0', // remove default, we use gap above
                color: '#0f172a', // high contrast
                lineHeight: '1.6',
                letterSpacing: '-0.01em'
            }}
        >
            Revenue (₦ Million)
        </h2>

        <ResponsiveContainer width="100%" height={300} style={{ width: '100%', maxWidth: '100%' }}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
                    tickFormatter={(value) => `₦${value}M`}
                />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.75rem',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: '#0f172a',
                        lineHeight: '1.6'
                    }}
                    cursor={{ fill: 'rgba(22, 163, 74, 0.08)' }}
                    formatter={(value) => [`₦${value}M`, 'Revenue']}
                />
                <Bar
                    dataKey="revenue"
                    fill="#16a34a" // modern green
                    radius={[8, 8, 0, 0]} // rounded top bars
                    barSize={40}
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

}