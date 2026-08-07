import React from "react";

export default function Receipt({ payment }) {

    if (!payment) return null;

    return (

        <div
            id="receipt"
            className="bg-white p-10 max-w-3xl mx-auto"
        >

            <h1 className="text-3xl font-bold text-center mb-2">
                SOUND PEACE INTERNATIONAL SCHOOLS
            </h1>

            <p className="text-center text-gray-500 mb-8">
                Official School Payment Receipt
            </p>

            <div className="grid grid-cols-2 gap-6">

                <div>
                    <strong>Receipt No:</strong>
                    <p>{payment.receiptNumber}</p>
                </div>

                <div>
                    <strong>Date:</strong>
                    <p>
                        {new Date(
                            payment.paymentDate
                        ).toLocaleDateString()}
                    </p>
                </div>

                <div>
                    <strong>Student</strong>
                    <p>{payment.studentName}</p>
                </div>

                <div>
                    <strong>Class</strong>
                    <p>{payment.className}</p>
                </div>

                <div>
                    <strong>Payment Type</strong>
                    <p>{payment.paymentType}</p>
                </div>

                <div>
                    <strong>Method</strong>
                    <p>{payment.paymentMethod}</p>
                </div>

                <div>
                    <strong>Status</strong>
                    <p>{payment.status}</p>
                </div>

                <div>
                    <strong>Amount</strong>
                    <p>
                        ₦
                        {Number(payment.amount).toLocaleString()}
                    </p>
                </div>

            </div>

            <hr className="my-8" />

            <div>

                <strong>Remarks</strong>

                <p>
                    {payment.remarks || "No remarks"}
                </p>

            </div>

        </div>

    );

}