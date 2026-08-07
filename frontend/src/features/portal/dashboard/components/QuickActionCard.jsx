import React from "react";
import { Link } from "react-router-dom";

export default function QuickActionCard({

    title,

    description,

    icon: Icon,

    to,

    color,

}) {
return (
    <Link
        to={to}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(15, 23, 42, 0.12)';
            e.currentTarget.querySelector('h3').style.color = '#1d4ed8'; // group-hover:text-blue-700
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.06)';
            e.currentTarget.querySelector('h3').style.color = '#0f172a';
        }}
        style={{
            backgroundColor: '#ffffff',
            borderRadius: '1rem', // rounded-2xl
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)', // shadow-sm
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)', // transition-all duration-300
            padding: '1.5rem', // p-6
            border: '1px solid #f1f5f9', // border border-gray-100
            textDecoration: 'none',
            display: 'block',
            maxWidth: '100%',
            boxSizing: 'border-box'
        }}
    >
        <div
            style={{
                width: '3.5rem', // w-14
                height: '3.5rem', // h-14
                borderRadius: '0.75rem', // rounded-xl
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color, // pass hex: "#2563eb" not "bg-blue-600"
                flexShrink: 0
            }}
        >
            <Icon
                style={{
                    fontSize: '1.5rem', // text-2xl
                    color: '#ffffff'
                }}
            />
        </div>

        <h3
            style={{
                marginTop: '1.25rem', // mt-5
                fontSize: '1.125rem', // text-lg
                fontWeight: '700',
                color: '#0f172a',
                transition: 'color 200ms ease', // transition
                lineHeight: '1.6',
                margin: '1.25rem 0 0 0'
            }}
        >
            {title}
        </h3>

        <p
            style={{
                marginTop: '0.5rem', // mt-2
                color: '#64748b', // text-gray-500
                fontSize: '0.95rem',
                lineHeight: '1.6',
                margin: '0.5rem 0 0 0'
            }}
        >
            {description}
        </p>
    </Link>
);
}