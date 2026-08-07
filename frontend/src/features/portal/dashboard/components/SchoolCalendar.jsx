import React from "react";

export default function SchoolCalendar() {

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
                School Calendar
            </h2>

            <div
                style={{
                    height: '20rem', // h-80
                    borderRadius: '0.75rem', // rounded-xl
                    border: '2px dashed #cbd5e1', // border-2 border-dashed border-gray-300
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8', // text-gray-400
                    fontSize: '1.125rem', // text-lg
                    textAlign: 'center',
                    lineHeight: '1.6',
                    backgroundColor: '#f8fafc', // subtle bg to make placeholder feel intentional
                    padding: '1rem',
                    maxWidth: '100%',
                    boxSizing: 'border-box'
                }}
            >
                <span>
                    Calendar Widget
                    <br />
                    (Will later connect to FullCalendar)
                </span>
            </div>
        </div>
    );

}