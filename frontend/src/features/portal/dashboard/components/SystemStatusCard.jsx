import React from "react";

const status = [

    {

        title: "Server",

        value: "Online",

        color: "bg-green-500",

    },

    {

        title: "Database",

        value: "Connected",

        color: "bg-green-500",

    },

    {

        title: "API",

        value: "Healthy",

        color: "bg-green-500",

    },

    {

        title: "Storage",

        value: "72% Used",

        color: "bg-yellow-500",

    },

    {

        title: "Last Backup",

        value: "Today",

        color: "bg-blue-600",

    },

    {

        title: "Uptime",

        value: "99.98%",

        color: "bg-purple-600",

    },

];

export default function SystemStatusCard() {

        return (
        <div
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '1rem', // rounded-2xl
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)', // shadow-sm
                padding: '1.5rem', // p-6
                margin: '1.5rem', // space so it doesn't touch screen edges
                border: '1px solid #f1f5f9',
                maxWidth: '100%',
                boxSizing: 'border-box'
            }}
        >
            <h2
                style={{
                    fontSize: '1.25rem', // text-xl
                    fontWeight: '700',
                    marginBottom: '1.5rem', // mb-6
                    color: '#0f172a',
                    lineHeight: '1.6',
                    letterSpacing: '-0.01em'
                }}
            >
                System Status
            </h2>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem' // space-y-5
                }}
            >
                {status.map((item) => (
                    <div
                        key={item.title}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '0.75rem'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem' // gap-3
                            }}
                        >
                            <div
                                style={{
                                    width: '0.75rem', // w-3
                                    height: '0.75rem', // h-3
                                    borderRadius: '50%',
                                    backgroundColor: item.color, // pass hex like "#22c55e" instead of "bg-green-500"
                                    flexShrink: 0
                                }}
                            />
                            <span
                                style={{
                                    color: '#334155',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6'
                                }}
                            >
                                {item.title}
                            </span>
                        </div>

                        <span
                            style={{
                                fontWeight: '600',
                                color: '#0f172a',
                                fontSize: '0.95rem',
                                lineHeight: '1.6'
                            }}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

}