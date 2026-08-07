import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import "./PaymentReceipt.css";
import {
  CheckCircle,
  Home,
  Printer,
  Download,
  School,
  User,
  Wallet,
  Calendar,
  Hash,
  BadgeCheck,
  LoaderCircle,
} from "lucide-react";

import {
  useGetPaymentReceiptQuery,
} from "../../redux/api/paymentApi";

import logo from "../../assets/images/logoo.png";
export default function PaymentReceipt() {
 
    const [searchParams] = useSearchParams();
const receiptRef = useRef(null);
const reference = searchParams.get("reference");

const {
  data,
  isLoading,
  error,
} = useGetPaymentReceiptQuery(reference, {
  skip: !reference,
});

if (isLoading) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "Candara",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <LoaderCircle
          size={70}
          className="animate-spin"
          color="#0B3D91"
        />

        <h2>Loading Receipt...</h2>
      </div>
    </div>
  );
}

if (error || !data?.success) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "Candara",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#DC2626",
          }}
        >
          Receipt Not Available
        </h1>

        <p>
          This payment receipt could not be found.
        </p>

        <Link
          to="/"
          style={{
            background: "#0B3D91",
            color: "#FFD700",
            padding: "14px 28px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "20px",
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

const payment = data?.payment || {};

const admission = data?.admission || {};


  const schoolName = "Sound Peace International Schools";

  const receiptNumber =
    payment.paymentReference ||
    payment.transactionReference ||
    "N/A";

  const amount = Number(payment.amount || 0);

  const paymentDate = payment.paidAt
    ? new Date(payment.paidAt).toLocaleString()
    : new Date().toLocaleString();

  const statusColor =
    payment.status === "Successful"
      ? "#16A34A"
      : "#DC2626";

  const printReceipt = () => {
    window.print();
  };

const downloadReceipt = async () => {

const input = receiptRef.current;

if (!input) return;

    const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
    );

    const pdfWidth =
        pdf.internal.pageSize.getWidth();

    const pdfHeight =
        (canvas.height * pdfWidth) /
        canvas.width;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
    );

    pdf.save(
        `Receipt-${payment.paymentReference}.pdf`
    );

};

  return (
<main
  style={{
    minHeight: "100vh",
    background: "#F1F5F9",
    fontFamily: "Candara",
    padding: "30px 22px",
    boxSizing: "border-box",
  }}
>
{/* <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8 font-[Candara]"> */}

<div ref={receiptRef}>

<div
  style={{
    maxWidth: "900px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow:
      "0 15px 40px rgba(0,0,0,.08)",
  }}
>
        {/* ================= HEADER ================= */}

        <div
          style={{
            background: "#0B3D91",
            color: "#fff",
            padding: "35px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {/* <School
                size={55}
                color="#FFD700"
              /> */}
              <img
    src={logo}
    alt="School Logo"
    style={{
        width:90,
        marginBottom:20
    }}
/>

              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: 700,
                  }}
                >
                  {schoolName}
                </h1>

                <p
                  style={{
                    marginTop: "8px",
                    color: "#E5E7EB",
                  }}
                >
                  Official Payment Receipt
                </p>
              </div>
            </div>

            <CheckCircle
              size={75}
              color="#22C55E"
            />
          </div>
        </div>

        {/* ================= RECEIPT TITLE ================= */}

        <div
          style={{
            padding: "35px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0B3D91",
              marginTop: 0,
              marginBottom: "35px",
              fontSize: "32px",
            }}
          >
            PAYMENT RECEIPT
          </h2>

          {/* ================= RECEIPT DETAILS ================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "25px",
              marginBottom: "35px",
            }}
          >
            <InfoCard
              icon={<Hash size={18} />}
              title="Receipt Number"
              value={receiptNumber}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              title="Payment Date"
              value={paymentDate}
            />

            <InfoCard
              icon={<BadgeCheck size={18} />}
              title="Payment Status"
              value={
                payment.status === "Successful"
                    ? "✅ Successful"
                    : payment.status === "Pending"
                    ? "🟡 Pending"
                    : "❌ Failed"
                }
              color={statusColor}
            />

            <InfoCard
              icon={<Wallet size={18} />}
              title="Amount Paid"
              value={`₦${amount.toLocaleString()}`}
            />
          </div>

                    {/* ================= PAYER INFORMATION ================= */}

          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                color: "#0B3D91",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              <User size={22} />
              Payer Information
            </h3>

            <ReceiptRow
              label="Full Name"
              value={payment.payerName || "N/A"}
            />

            <ReceiptRow
              label="Email Address"
              value={payment.payerEmail || "N/A"}
            />

            <ReceiptRow
              label="Phone Number"
              value={payment.payerPhone || "N/A"}
            />
          </div>

          {/* ================= STUDENT INFORMATION ================= */}

          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                color: "#0B3D91",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              <School size={22} />
              Student Information
            </h3>

            <ReceiptRow
              label="Student Name"
              value={payment.studentName || "N/A"}
            />

            <ReceiptRow
              label="Class"
              value={
                payment.classApplyingFor ||
                payment.studentClass ||
                "N/A"
              }
            />

            {admission?.applicationNumber && (
              <ReceiptRow
                label="Application Number"
                value={admission.applicationNumber}
              />
            )}
          </div>

          {/* ================= PAYMENT INFORMATION ================= */}

          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                color: "#0B3D91",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              <Wallet size={22} />
              Payment Information
            </h3>

            <ReceiptRow
              label="Payment Purpose"
              value={payment.paymentPurpose || "N/A"}
            />

            <ReceiptRow
              label="Payment Method"
              value={payment.paymentMethod || "Paystack"}
            />

            <ReceiptRow
              label="Payment Reference"
              value={payment.paymentReference || "N/A"}
            />

            <ReceiptRow
              label="Transaction Reference"
              value={
                payment.transactionReference ||
                payment.paymentReference ||
                "N/A"
              }
            />

            <ReceiptRow
              label="Gateway Response"
              value={payment.gatewayResponse || "Successful"}
            />
          </div>

          {/* ================= PAYMENT SUMMARY ================= */}

          <div
            style={{
              border: "2px solid #FFD700",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "35px",
            }}
          >
            <div
              style={{
                background: "#0B3D91",
                color: "#fff",
                padding: "15px 20px",
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              Payment Summary
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#F8FAFC",
                  }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "15px",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    Description
                  </th>

                  <th
                    style={{
                      textAlign: "right",
                      padding: "15px",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    style={{
                      padding: "18px",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    {payment.paymentPurpose}
                  </td>

                  <td
                    style={{
                      padding: "18px",
                      textAlign: "right",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    ₦{Number(amount || 0).toLocaleString()}
                  </td>
                </tr>

                <tr
                  style={{
                    background: "#FFFBEA",
                    fontWeight: 700,
                    fontSize: "18px",
                  }}
                >
                  <td
                    style={{
                      padding: "18px",
                    }}
                  >
                    TOTAL PAID
                  </td>

                  <td
                    style={{
                      padding: "18px",
                      textAlign: "right",
                      color: "#16A34A",
                    }}
                  >
                    ₦{amount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

                    {/* ================= SIGNATURE SECTION ================= */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "30px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  height: "70px",
                  borderBottom: "2px solid #000",
                  marginBottom: "10px",
                }}
              />

              <strong>Authorized Signature</strong>
            </div>

            <div
              style={{
                textAlign: "center",
              }}
            >
              <div
                style={{
                  height: "70px",
                  borderBottom: "2px solid #000",
                  marginBottom: "10px",
                }}
              />

              <strong>School Stamp</strong>
            </div>
          </div>

          {/* ================= THANK YOU ================= */}

          <div
            style={{
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            <h2
              style={{
                color: "#16A34A",
                marginBottom: "10px",
              }}
            >
              Thank You!
            </h2>

            <p
              style={{
                color: "#6B7280",
                lineHeight: 1.8,
                fontSize: "15px",
              }}
            >
              Your payment has been received successfully.

              <br />

              Please keep this receipt for your records.
            </p>
          </div>

          {/* ================= ACTION BUTTONS ================= */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "18px",
            }}
          >
            <button
              type="button"
              onClick={printReceipt}
              style={buttonStyle("#0B3D91", "#FFD700")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFD700";
                e.currentTarget.style.color = "#0B3D91";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0B3D91";
                e.currentTarget.style.color = "#FFD700";
              }}
            >
              <Printer size={20} />

              Print Receipt
            </button>

            <button
            type="button"
              onClick={downloadReceipt}
              style={buttonStyle("#16A34A", "#fff")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#15803D";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#16A34A";
              }}
            >
              <Download size={20} />

              Download PDF
            </button>

            <Link
              to="/"
              style={{
                ...buttonStyle("#8B0000", "#FFD700"),
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFD700";
                e.currentTarget.style.color = "#8B0000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#8B0000";
                e.currentTarget.style.color = "#FFD700";
              }}
            >
              <Home size={20} />

              Return Home
            </Link>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function InfoCard({
  icon,
  title,
  value,
  color = "#111827",
}) {
  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "10px",
        padding: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#0B3D91",
          marginBottom: "10px",
          fontWeight: 700,
        }}
      >
        {icon}

        {title}
      </div>

        <div
        style={{
        color,
        fontWeight:700,
        fontSize:"17px",
        wordBreak:"break-word",
        lineHeight:1.6,
        }}
        >
        {value}
      </div>
    </div>
  );
}

function ReceiptRow({
  label,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #F1F5F9",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <strong>{label}</strong>

      <span
        style={{
            fontWeight: 600,
            color: "#374151",
            textAlign: "right",
            wordBreak: "break-word",
        }}
        >
        {value || "N/A"}
        </span>
    </div>
  );
}

function buttonStyle(background, color) {
  return {
    background,
    color,
    border: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "15px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "0.3s ease",
  };
}