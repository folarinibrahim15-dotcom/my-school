import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  CheckCircle,
  XCircle,
  LoaderCircle,
  Home,
} from "lucide-react";

import {
  useLazyVerifyPaymentQuery,
} from "../../redux/api/paymentApi";

export default function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reference = searchParams.get("reference");

  const [verifyPayment] = useLazyVerifyPaymentQuery();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [isHomeHover, setIsHomeHover] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (!reference) {
        setResult({
          success: false,
          message: "Invalid payment reference.",
        });

        setLoading(false);
        return;
      }

      try {
        const response = await verifyPayment(reference).unwrap();

        setResult(response);

        setLoading(false);

        if (response.success) {
          setTimeout(() => {
            navigate(
              `/payment/receipt?reference=${reference}`
            );
          }, 2500);
        }
      } catch (err) {
        setResult({
          success: false,
          message:
            err?.data?.message ||
            "Payment verification failed.",
        });

        setLoading(false);
      }
    };

    verify();
  }, [reference, verifyPayment, navigate]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          fontFamily: "Candara",
          background: "#F8FAFC",
        }}
      >
        <LoaderCircle
          size={70}
          color="#0B3D91"
          className="animate-spin"
        />

        <h2
          style={{
            color: "#0B3D91",
          }}
        >
          Verifying Payment...
        </h2>

        <p>Please wait while we confirm your payment.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Candara",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          background: "#fff",
          borderRadius: "18px",
          padding: "45px",
          textAlign: "center",
          boxShadow: "0 15px 40px rgba(0,0,0,.08)",
        }}
      >
        {result?.success ? (
          <>
            <CheckCircle
              size={90}
              color="#16A34A"
            />

            <h1
              style={{
                color: "#16A34A",
                marginTop: "20px",
              }}
            >
              Payment Successful
            </h1>

            <p
              style={{
                color: "#555",
                fontSize: "17px",
              }}
            >
              {result?.message}
            </p>

            <p
              style={{
                color: "#0B3D91",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Redirecting to your receipt...
            </p>

            <hr
              style={{
                margin: "30px 0",
              }}
            />

            <div
              style={{
                textAlign: "left",
                lineHeight: 2,
              }}
            >
              <p>
                <strong>Reference:</strong>{" "}
                {result?.payment?.paymentReference || "N/A"}
              </p>

              <p>
                <strong>Amount:</strong> ₦
                {Number(
                  result?.payment?.amount || 0
                ).toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {result?.payment?.status || "Successful"}
              </p>

              <p>
                <strong>Student:</strong>{" "}
                {result?.payment?.studentName || "N/A"}
              </p>

              <p>
                <strong>Purpose:</strong>{" "}
                {result?.payment?.paymentPurpose || "N/A"}
              </p>

              {result?.admission?.applicationNumber && (
                <p>
                  <strong>Application Number:</strong>{" "}
                  {result.admission.applicationNumber}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <XCircle
              size={90}
              color="#DC2626"
            />

            <h1
              style={{
                color: "#DC2626",
                marginTop: "20px",
              }}
            >
              Payment Failed
            </h1>

            <p
              style={{
                color: "#555",
                marginTop: "15px",
              }}
            >
              {result?.message}
            </p>

            <div
              style={{
                marginTop: "35px",
              }}
            >
              <Link
                to="/"
                onMouseEnter={() =>
                  setIsHomeHover(true)
                }
                onMouseLeave={() =>
                  setIsHomeHover(false)
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  minWidth: "190px",
                  padding: "15px 25px",
                  textDecoration: "none",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "16px",
                  transition: ".35s ease",
                  background: isHomeHover
                    ? "#FFD700"
                    : "#0B3D91",
                  color: isHomeHover
                    ? "#0B3D91"
                    : "#FFD700",
                  border: "2px solid #0B3D91",
                }}
              >
                <Home size={20} />
                Return Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}