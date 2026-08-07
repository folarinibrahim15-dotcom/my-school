import React from "react";

const events = [

    {
        id: 1,
        title: "First Term Examination",
        date: "28 Jul 2026",
        color: "bg-red-500",
    },

    {
        id: 2,
        title: "PTA General Meeting",
        date: "02 Aug 2026",
        color: "bg-blue-600",
    },

    {
        id: 3,
        title: "Inter-House Sports",
        date: "15 Aug 2026",
        color: "bg-green-600",
    },

    {
        id: 4,
        title: "Mid-Term Break",
        date: "25 Aug 2026",
        color: "bg-yellow-500",
    },

];

export default function UpcomingEvents() {

   return (
    <div
        style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem', // rounded-2xl
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)', // shadow-sm
            padding: '1.5rem', // p-6
            margin: '1.5rem', // page breathing space
            border: '1px solid #f1f5f9',
            maxWidth: '100%',
            boxSizing: 'border-box'
        }}
    >
        {/* Header */}
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem', // mb-6
                flexWrap: 'wrap',
                gap: '1rem'
            }}
        >
            <h2
                style={{
                    fontSize: '1.25rem', // text-xl
                    fontWeight: '700',
                    color: '#0f172a',
                    margin: '0',
                    lineHeight: '1.6'
                }}
            >
                Upcoming Events
            </h2>

            <button
                onClick={() => {/* add your navigate here if needed */}}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#1d4ed8'; e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.textDecoration = 'none'; }}
                style={{
                    color: '#2563eb',
                    fontWeight: '600',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease',
                    fontSize: '0.95rem'
                }}
            >
                View All
            </button>
        </div>

        {/* Events List */}
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem' // space-y-5
            }}
        >
            {events.map((event) => (
                <div
                    key={event.id}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem' // gap-4
                    }}
                >
                    <div
                        style={{
                            width: '1rem', // w-4
                            height: '1rem', // h-4
                            borderRadius: '50%',
                            backgroundColor: event.color, // pass hex like "#2563eb" instead of "bg-blue-500"
                            flexShrink: 0
                        }}
                    />

                    <div style={{ flex: '1 1 0%', minWidth: 0 }}>
                        <h4
                            style={{
                                fontWeight: '600',
                                color: '#1e293b',
                                fontSize: '1rem',
                                margin: '0',
                                lineHeight: '1.6'
                            }}
                        >
                            {event.title}
                        </h4>
                        <p
                            style={{
                                fontSize: '0.875rem', // text-sm
                                color: '#64748b', // text-gray-500
                                margin: '0.25rem 0 0 0',
                                lineHeight: '1.6'
                            }}
                        >
                            {event.date}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

}