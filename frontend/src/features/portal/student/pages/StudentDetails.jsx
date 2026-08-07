import React from "react";
import { useParams } from "react-router-dom";
import { useGetStudentQuery } from "../../../../redux/api/studentApi";

export default function StudentDetails() {

    const { id } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useGetStudentQuery(id);

    if (isLoading) {
        return <div className="p-8">Loading student...</div>;
    }

    if (isError) {
        return <div className="p-8">Unable to load student.</div>;
    }

    const student = data.data;

   return (
    <div
        style={{
            maxWidth: '80rem', // max-w-7xl
            margin: '0 auto',
            padding: '1.5rem', // p-6, becomes 2rem on large screens below
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem', // space-y-8
            boxSizing: 'border-box'
        }}
    >
        {/* Header Card */}
        <div
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '1.5rem', // rounded-3xl
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                border: '1px solid #e5e7eb', // border-gray-200
                padding: '2rem', // p-8
                maxWidth: '100%'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem' // gap-8
                }}
            >
                {/* Passport */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src={
                            student.passport ||
                            `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&size=300`
                        }
                        alt={student.firstName}
                        style={{
                            width: '13rem', // w-52
                            height: '13rem', // h-52
                            borderRadius: '1.5rem', // rounded-3xl
                            objectFit: 'cover',
                            border: '1px solid #e5e7eb',
                            maxWidth: '100%'
                        }}
                    />
                </div>

                {/* Information Cards Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // responsive: 1 col mobile, 2 col lg
                        gap: '1.5rem' // gap-6
                    }}
                >
                    {/* Parent */}
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '1rem', // rounded-2xl
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                            padding: '1.5rem' // p-6
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '1.25rem', // text-xl
                                fontWeight: '700',
                                marginBottom: '1.5rem',
                                color: '#0f172a',
                                lineHeight: '1.6'
                            }}
                        >
                            Parent / Guardian
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>
                                    Parent
                                </p>
                                <h4 style={{ fontWeight: '600', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                    {student.parent
                                        ? `${student.parent.firstName} ${student.parent.lastName}`
                                        : "Not Assigned"}
                                </h4>
                            </div>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>
                                    Phone
                                </p>
                                <h4 style={{ fontWeight: '600', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                    {student.parent?.phoneNumber || "-"}
                                </h4>
                            </div>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>
                                    Email
                                </p>
                                <h4 style={{ fontWeight: '600', color: '#0f172a', margin: '0.25rem 0 0 0', wordBreak: 'break-all', lineHeight: '1.6' }}>
                                    {student.parent?.email || "-"}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '1rem',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                            padding: '1.5rem'
                        }}
                    >
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a', lineHeight: '1.6' }}>
                            Contact Information
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>
                                    Address
                                </p>
                                <h4 style={{ fontWeight: '600', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                    {student.address}
                                </h4>
                            </div>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>
                                    Active
                                </p>
                                <h4 style={{ fontWeight: '600', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                    {student.isActive ? "Yes" : "No"}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Admission */}
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '1rem',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                            padding: '1.5rem'
                        }}
                    >
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a', lineHeight: '1.6' }}>
                            Admission
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>
                                    Admission Status
                                </p>
                                <h4 style={{ fontWeight: '600', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                    {student.admissionStatus}
                                </h4>
                            </div>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>
                                    Session
                                </p>
                                <h4 style={{ fontWeight: '600', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                    {student.session}
                                </h4>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '1rem',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                            padding: '1.5rem'
                        }}
                    >
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a', lineHeight: '1.6' }}>
                            Payment
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>
                                    Payment Status
                                </p>
                                <h4 style={{ fontWeight: '600', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                    {student.paymentStatus}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Info */}
                <div style={{ flex: '1 1 0%' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}
                    >
                        <div>
                            <h1
                                style={{
                                    fontSize: '2.25rem', // text-4xl
                                    fontWeight: '700',
                                    color: '#111827', // text-gray-900
                                    margin: '0',
                                    lineHeight: '1.6'
                                }}
                            >
                                {student.firstName} {student.lastName}
                            </h1>
                            <p style={{ marginTop: '0.5rem', color: '#64748b', margin: '0.5rem 0 0 0', lineHeight: '1.6' }}>
                                Admission No: {student.admissionNumber}
                            </p>
                        </div>
                        <span
                            style={{
                                padding: '0.5rem 1rem', // px-4 py-2
                                borderRadius: '9999px', // rounded-full
                                fontSize: '0.875rem', // text-sm
                                fontWeight: '600',
                                backgroundColor: student.isActive ? '#dcfce7' : '#fee2e2', // green-100 / red-100
                                color: student.isActive ? '#15803d' : '#b91c1c' // green-700 / red-700
                            }}
                        >
                            {student.isActive ? "Active Student" : "Inactive"}
                        </span>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', // md:grid-cols-2
                            gap: '1.5rem', // gap-6
                            marginTop: '2rem' // mt-8
                        }}
                    >
                        <div>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>Gender</p>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                {student.gender}
                            </h3>
                        </div>
                        <div>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>Class</p>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                {student.class}
                            </h3>
                        </div>
                        <div>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>Academic Session</p>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                {student.session}
                            </h3>
                        </div>
                        <div>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0', lineHeight: '1.6' }}>Date of Birth</p>
                            <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#0f172a', margin: '0.25rem 0 0 0', lineHeight: '1.6' }}>
                                {new Date(student.dateOfBirth).toLocaleDateString()}
                            </h3>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem', // gap-4
                            marginTop: '2.5rem' // mt-10
                        }}
                    >
                        <button
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1e40af'; }}
                            style={{
                                backgroundColor: '#1e40af', // bg-blue-700
                                color: '#ffffff',
                                padding: '0.75rem 1.5rem', // px-6 py-3
                                borderRadius: '0.75rem', // rounded-xl
                                border: 'none',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease',
                                boxShadow: '0 4px 12px rgba(30, 64, 175, 0.2)'
                            }}
                        >
                            Edit Student
                        </button>

                        <button
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
                            style={{
                                border: '1px solid #cbd5e1',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                backgroundColor: '#ffffff',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            Print Profile
                        </button>

                        <button
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
                            style={{
                                border: '1px solid #cbd5e1',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.75rem',
                                backgroundColor: '#ffffff',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

}