import React, { useState, useEffect } from "react";
import {
    HiOutlineEye,
    HiOutlinePencilSquare,
    HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/

function StatusBadge({ value, type }) {

    let background = "#F3F4F6";
    let color = "#374151";

    if (type === "admission") {

        if (value === "Admitted") {

            background = "#DCFCE7";
            color = "#15803D";

        } else if (value === "Rejected") {

            background = "#FEE2E2";
            color = "#B91C1C";

        } else {

            background = "#FEF9C3";
            color = "#A16207";

        }

    }

    if (type === "payment") {

        if (value === "Paid") {

            background = "#DCFCE7";
            color = "#15803D";

        } else {

            background = "#FEE2E2";
            color = "#B91C1C";

        }

    }

    return (

        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 12px",
                borderRadius: "9999px",
                backgroundColor: background,
                color,
                fontSize: "11px",
                fontWeight: "700",
                whiteSpace: "nowrap",
            }}
        >
            {value || "-"}
        </span>

    );

}

/*
|--------------------------------------------------------------------------
| Mobile Info Row
|--------------------------------------------------------------------------
*/

function InfoRow({ label, value }) {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "10px",
                paddingBottom: "8px",
                borderBottom: "1px solid #F1F5F9",
            }}
        >

            <span
                style={{
                    color: "#64748B",
                    fontSize: "12px",
                    fontWeight: "600",
                    flexShrink: 0,
                }}
            >
                {label}
            </span>

            <span
                style={{
                    color: "#0F172A",
                    fontSize: "13px",
                    fontWeight: "600",
                    textAlign: "right",
                    wordBreak: "break-word",
                }}
            >
                {value || "-"}
            </span>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Action Buttons
|--------------------------------------------------------------------------
*/

function ActionButtons({

    student,

    navigate,

    onEdit,

    onDelete,

}) {

    const buttonStyle = {

        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "4px",
        borderRadius: "8px",
        transition: "all .2s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                gap: ".75rem",
            }}
        >

            <button
                onClick={() =>
                    navigate(`/portal/students/${student._id}`)
                }
                style={{
                    ...buttonStyle,
                    color: "#2563EB",
                }}
            >
                <HiOutlineEye size={20} />
            </button>

            <button
                onClick={() => onEdit(student)}
                style={{
                    ...buttonStyle,
                    color: "#16A34A",
                }}
            >
                <HiOutlinePencilSquare size={20} />
            </button>

            <button
                onClick={() => onDelete(student)}
                style={{
                    ...buttonStyle,
                    color: "#DC2626",
                }}
            >
                <HiOutlineTrash size={20} />
            </button>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Student Table
|--------------------------------------------------------------------------
*/

export default function StudentTable({

    students = [],

    onEdit,

    onDelete,

}) {

    const navigate = useNavigate();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {

        const resize = () => setScreenWidth(window.innerWidth);

        window.addEventListener("resize", resize);

        return () =>
            window.removeEventListener("resize", resize);

    }, []);

    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;
    const isTiny = screenWidth < 480;

    const padX = isTiny ? 10 : isMobile ? 12 : isTablet ? 16 : 24;
    const padY = isTiny ? 10 : isMobile ? 12 : isTablet ? 14 : 16;
    const fontSize = isTiny ? 11 : isMobile ? 12 : isTablet ? 13 : 14;
    const imgSize = isTiny ? 40 : isMobile ? 44 : 48;

    const containerStyle = {

        backgroundColor: "#ffffff",
        borderRadius: "1rem",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 16px rgba(15,23,42,.06)",
        overflow: "hidden",
        margin: isMobile ? "12px" : "24px",
        width: "auto",
        boxSizing: "border-box",

    };

    const headerCell = {

        padding: `${padY}px ${padX}px`,
        textAlign: "left",
        fontSize,
        fontWeight: "600",
        color: "#334155",

    };

    const bodyCell = {

        padding: `${padY}px ${padX}px`,
        color: "#334155",
        verticalAlign: "middle",
        fontSize,

    };

    /*
|--------------------------------------------------------------------------
| Desktop & Tablet Layout
|--------------------------------------------------------------------------
*/

if (!isMobile) {

    return (

        <div style={containerStyle}>

            <div
                style={{
                    width: "100%",
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "auto",
                        minWidth: isTablet ? "950px" : "100%",
                    }}
                >

                    <thead
                        style={{
                            backgroundColor: "#F8FAFC",
                        }}
                    >

                        <tr>

                            <th style={headerCell}>Student</th>

                            <th style={headerCell}>
                                Admission No.
                            </th>

                            <th style={headerCell}>
                                Class
                            </th>

                            <th style={headerCell}>
                                Gender
                            </th>

                            <th style={headerCell}>
                                Session
                            </th>

                            <th style={headerCell}>
                                Admission
                            </th>

                            <th style={headerCell}>
                                Payment
                            </th>

                            <th
                                style={{
                                    ...headerCell,
                                    textAlign: "center",
                                }}
                            >
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {students.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={8}
                                    style={{
                                        textAlign: "center",
                                        padding: "3rem",
                                        color: "#64748B",
                                    }}
                                >
                                    No students found.
                                </td>

                            </tr>

                        ) : (

                            students.map((student) => (

                                <tr
                                    key={student._id}
                                    style={{
                                        borderBottom:
                                            "1px solid #F1F5F9",
                                        transition: ".25s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "#F8FAFC";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "#FFFFFF";
                                    }}
                                >

                                    {/* Student */}

                                    <td
                                        style={{
                                            ...bodyCell,
                                            minWidth: isTablet
                                                ? "220px"
                                                : "250px",
                                        }}
                                    >

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                            }}
                                        >

                                            <img
                                                src={
                                                    student.passport ||
                                                    `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}`
                                                }
                                                alt="Student"
                                                style={{
                                                    width: imgSize,
                                                    height: imgSize,
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    flexShrink: 0,
                                                }}
                                            />

                                            <div
                                                style={{
                                                    minWidth: 0,
                                                }}
                                            >

                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontWeight: 600,
                                                        color: "#0F172A",
                                                    }}
                                                >
                                                    {student.firstName}{" "}
                                                    {student.lastName}
                                                </p>

                                                <p
                                                    style={{
                                                        margin:
                                                            "4px 0 0 0",
                                                        fontSize:
                                                            fontSize - 1,
                                                        color:
                                                            "#64748B",
                                                        wordBreak:
                                                            "break-all",
                                                    }}
                                                >
                                                    {student.email}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    {/* Admission Number */}

                                    <td style={bodyCell}>
                                        {student.admissionNumber ||
                                            "-"}
                                    </td>

                                    {/* Class */}

                                    <td style={bodyCell}>
                                        {student.class || "-"}
                                    </td>

                                    {/* Gender */}

                                    <td style={bodyCell}>
                                        {student.gender || "-"}
                                    </td>

                                    {/* Session */}

                                    <td style={bodyCell}>
                                        {student.session || "-"}
                                    </td>

                                    {/* Admission */}

                                    <td style={bodyCell}>

                                        <StatusBadge
                                            value={
                                                student.admissionStatus
                                            }
                                            type="admission"
                                        />

                                    </td>

                                    {/* Payment */}

                                    <td style={bodyCell}>

                                        <StatusBadge
                                            value={
                                                student.paymentStatus
                                            }
                                            type="payment"
                                        />

                                    </td>

                                    {/* Actions */}

                                    <td
                                        style={{
                                            ...bodyCell,
                                            textAlign: "center",
                                        }}
                                    >

                                        <ActionButtons
                                            student={student}
                                            navigate={navigate}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                        />

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

/*
|--------------------------------------------------------------------------
| Mobile Card Layout < 768px - ALL CONTENT VISIBLE
|--------------------------------------------------------------------------
*/

return (
    <div
        style={{
            display: "grid",
            gap: "1rem",
            margin: "12px",
        }}
    >
        {students.length === 0 ? (

            <div
                style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "1rem",
                    padding: "2.5rem",
                    textAlign: "center",
                    color: "#64748b",
                    boxShadow: "0 4px 16px rgba(15,23,42,.06)",
                }}
            >
                No students found.
            </div>

        ) : (

            students.map((student) => (

                <div
                    key={student._id}
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "1rem",
                        padding: "1rem",
                        boxShadow: "0 4px 16px rgba(15,23,42,.06)",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                >

                    {/* Header */}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: ".75rem",
                            marginBottom: "1rem",
                        }}
                    >

                        <img
                            src={
                                student.passport ||
                                `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}`
                            }
                            alt="Student"
                            style={{
                                width: "3rem",
                                height: "3rem",
                                borderRadius: "50%",
                                objectFit: "cover",
                                flexShrink: 0,
                            }}
                        />

                        <div
                            style={{
                                minWidth: 0,
                                flex: 1,
                            }}
                        >

                            <p
                                style={{
                                    margin: 0,
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    fontSize: "1rem",
                                }}
                            >
                                {student.firstName} {student.lastName}
                            </p>

                            <p
                                style={{
                                    margin: "4px 0 0",
                                    color: "#64748B",
                                    fontSize: ".875rem",
                                    wordBreak: "break-all",
                                }}
                            >
                                {student.email || "-"}
                            </p>

                        </div>

                    </div>

                    {/* Information */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            gap: ".625rem",
                        }}
                    >

                        <InfoRow
                            label="Admission Number"
                            value={student.admissionNumber}
                        />

                        <InfoRow
                            label="Class"
                            value={
                                student.class ||
                                student.currentClass ||
                                student.className
                            }
                        />

                        <InfoRow
                            label="Gender"
                            value={student.gender}
                        />

                        <InfoRow
                            label="Session"
                            value={
                                student.session ||
                                student.academicSession
                            }
                        />

                        <div>

                            <div
                                style={{
                                    color: "#64748B",
                                    fontSize: "12px",
                                    marginBottom: "4px",
                                    fontWeight: "600",
                                }}
                            >
                                Admission Status
                            </div>

                            <StatusBadge
                                value={student.admissionStatus}
                                type="admission"
                            />

                        </div>

                        <div>

                            <div
                                style={{
                                    color: "#64748B",
                                    fontSize: "12px",
                                    marginBottom: "4px",
                                    fontWeight: "600",
                                }}
                            >
                                Payment Status
                            </div>

                            <StatusBadge
                                value={student.paymentStatus}
                                type="payment"
                            />

                        </div>

                    </div>

                    {/* Divider */}

                    <div
                        style={{
                            height: "1px",
                            backgroundColor: "#E5E7EB",
                            margin: "1rem 0",
                        }}
                    />

                    {/* Actions */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: ".75rem",
                        }}
                    >

                        <button
                            onClick={() =>
                                navigate(`/portal/students/${student._id}`)
                            }
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "#2563EB",
                                cursor: "pointer",
                                padding: "4px",
                            }}
                        >
                            <HiOutlineEye size={20} />
                        </button>

                        <button
                            onClick={() => onEdit(student)}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "#16A34A",
                                cursor: "pointer",
                                padding: "4px",
                            }}
                        >
                            <HiOutlinePencilSquare size={20} />
                        </button>

                        <button
                            onClick={() => onDelete(student)}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "#DC2626",
                                cursor: "pointer",
                                padding: "4px",
                            }}
                        >
                            <HiOutlineTrash size={20} />
                        </button>

                    </div>

                </div>

            ))

        )}
    </div>
);
}
