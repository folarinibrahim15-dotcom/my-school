import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetFinanceQuery } from "../../../../../redux/api/financeApi";

import jsPDF from "jspdf";

export default function FinanceDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
    } = useGetFinanceQuery(id);

    const payment = data?.data;

    // ===========================
    // PRINT RECEIPT
    // ===========================

    const handlePrint = () => {

        const receipt = document.getElementById("receipt-print");

        if (!receipt) return;

        const printWindow = window.open("", "_blank");

        printWindow.document.write(`

            <html>

            <head>

                <title>Payment Receipt</title>

                <style>

                    body{

                        font-family:Arial,sans-serif;

                        padding:40px;

                        color:#111827;

                    }

                    .receipt{

                        max-width:800px;

                        margin:auto;

                    }

                    .school{

                        text-align:center;

                        margin-bottom:25px;

                    }

                    h1{

                        color:#1d4ed8;

                    }

                    table{

                        width:100%;

                        border-collapse:collapse;

                        margin-top:20px;

                    }

                    td{

                        border:1px solid #ddd;

                        padding:12px;

                    }

                    .amount{

                        color:#15803d;

                        font-size:22px;

                        font-weight:bold;

                    }

                    .footer{

                        display:flex;

                        justify-content:space-between;

                        margin-top:60px;

                    }

                </style>

            </head>

            <body>

                ${receipt.innerHTML}

            </body>

            </html>

        `);

        printWindow.document.close();

        printWindow.focus();

        printWindow.print();

        printWindow.close();

    };

    // ===========================
// DOWNLOAD PDF (jsPDF ONLY)
// ===========================

const handleDownloadPDF = () => {

    if (!payment) return;

    const pdf = new jsPDF("p", "mm", "a4");

    let y = 20;

    // ===========================
    // School Heading
    // ===========================

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor(30, 64, 175);
    pdf.text("Sound Peace International Schools", 105, y, {
        align: "center",
    });

    y += 8;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(100);

    pdf.text("Official Payment Receipt", 105, y, {
        align: "center",
    });

    y += 15;

    pdf.setDrawColor(180);
    pdf.line(20, y, 190, y);

    y += 12;

    const rows = [

        ["Receipt Number", payment.receiptNumber],

        ["Student", payment.studentName],

        ["Class", payment.className],

        ["Payment Type", payment.paymentType],

        ["Payment Method", payment.paymentMethod],

        [
            "Payment Date",
            new Date(payment.paymentDate).toLocaleDateString(),
        ],

        ["Status", payment.status],

        [
            "Amount Paid",
            `₦${Number(payment.amount).toLocaleString()}`,
        ],

        ["Remarks", payment.remarks || "No Remarks"],

    ];

    rows.forEach(([label, value]) => {

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.setTextColor(40);

        pdf.text(`${label}:`, 20, y);

        pdf.setFont("helvetica", "normal");

        pdf.text(String(value), 70, y);

        y += 10;

    });

    y += 10;

    pdf.line(20, y, 190, y);

    y += 25;

    pdf.text("_____________________", 25, y);
    pdf.text("Cashier", 45, y + 6);

    pdf.text("_____________________", 125, y);
    pdf.text("Principal", 145, y + 6);

    pdf.save(
        `${payment.receiptNumber || "receipt"}.pdf`
    );

};
    if (isLoading) {

        return (

            <div className="text-center py-20">

                Loading Payment...

            </div>

        );

    }

    if (isError || !payment) {

        return (

            <div className="text-center text-red-600 py-20">

                Payment Not Found

            </div>

        );

    }

    return (

        <div className="space-y-6">

            {/* Toolbar */}

            <div className="flex flex-wrap gap-4">

                <button

                    onClick={handlePrint}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

                >

                    🖨 Print Receipt

                </button>

                <button

                    onClick={handleDownloadPDF}

                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"

                >

                    📄 Download PDF

                </button>

                <button

                    onClick={() => navigate(-1)}

                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"

                >

                    ← Back

                </button>

            </div>

            {/* Receipt */}

            <div

                id="receipt-print"

                className="receipt bg-white rounded-2xl shadow border p-10"

            >

                <div className="school text-center">

                    <h1 className="text-4xl font-bold text-blue-700">

                        Sound Peace International Schools

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Official Payment Receipt

                    </p>

                </div>

                <hr className="my-8"/>

                <table className="w-full border-collapse">

                    <tbody>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Receipt Number

                            </td>

                            <td className="border p-3">

                                {payment.receiptNumber}

                            </td>

                        </tr>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Student

                            </td>

                            <td className="border p-3">

                                {payment.studentName}

                            </td>

                        </tr>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Class

                            </td>

                            <td className="border p-3">

                                {payment.className}

                            </td>

                        </tr>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Payment Type

                            </td>

                            <td className="border p-3">

                                {payment.paymentType}

                            </td>

                        </tr>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Payment Method

                            </td>

                            <td className="border p-3">

                                {payment.paymentMethod}

                            </td>

                        </tr>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Payment Date

                            </td>

                            <td className="border p-3">

                                {new Date(
                                    payment.paymentDate
                                ).toLocaleDateString()}

                            </td>

                        </tr>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Status

                            </td>

                            <td className="border p-3">

                                {payment.status}

                            </td>

                        </tr>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Amount Paid

                            </td>

                            <td className="border p-3 text-green-700 text-2xl font-bold">

                                ₦{Number(
                                    payment.amount
                                ).toLocaleString()}

                            </td>

                        </tr>

                        <tr>

                            <td className="border p-3 font-semibold">

                                Remarks

                            </td>

                            <td className="border p-3">

                                {payment.remarks || "No Remarks"}

                            </td>

                        </tr>

                    </tbody>

                </table>

                <div className="flex justify-between mt-20">

                    <div>

                        ______________________

                        <br />

                        Cashier

                    </div>

                    <div>

                        ______________________

                        <br />

                        Principal

                    </div>

                </div>

            </div>

        </div>

    );

}