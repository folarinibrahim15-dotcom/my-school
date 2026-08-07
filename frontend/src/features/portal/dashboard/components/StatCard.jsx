import React from "react";

export default function StatCard({

    title,

    value,

    icon: Icon,

    color,

    change,

}) {

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
                transition: 'all 300ms ease',
                padding: '1.5rem',
                border: '1px solid #f3f4f6',
                cursor: 'default',
                width: '100%',
                boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.06)'}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        margin: '0',
                        lineHeight: '1.6'
                    }}>
                        {title}
                    </p>
                    <h2 style={{
                        fontSize: '2.25rem',
                        fontWeight: '700',
                        margin: '0.75rem 0 0 0',
                        lineHeight: '1.3',
                        color: '#0f172a'
                    }}>
                        {value}
                    </h2>
                    <p
                        style={{
                            marginTop: '1rem',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: color === 'text-green-600' ? '#16a34a' : color === 'text-red-600' ? '#dc2626' : '#1d4ed8',
                            lineHeight: '1.6'
                        }}
                    >
                        {change}
                    </p>
                </div>
                <div
                    style={{
                        width: '4rem',
                        height: '4rem',
                        borderRadius: '16px',
                        backgroundColor: '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}
                >
                    <Icon
                        style={{
                            fontSize: '1.875rem',
                            color: '#1d4ed8'
                        }}
                    />
                </div>
            </div>
        </div>
    );

}