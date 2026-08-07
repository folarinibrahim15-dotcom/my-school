import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

import {
  useLazyVerifyPaymentQuery,
} from "../../redux/api/paymentApi";

export default function VerifyPayment() {
  const [searchParams] = useSearchParams();

  const reference = searchParams.get("reference");

  const [
    verifyPayment,
    {
      data,
      error,
      isLoading,
    },
  ] = useLazyVerifyPaymentQuery();

  useEffect(() => {
    if (reference) {
      verifyPayment(reference);
    }
  }, [reference, verifyPayment]);

  if (isLoading) {
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
        }}
      >
        <Loader2
          size={70}
          color="#0B3D91"
          className="animate-spin"
        />

        <h2>Verifying Payment...</h2>

        <p>Please wait while we confirm your payment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: "Candara",
          textAlign: "center",
        }}
      >
        <XCircle
          size={90}
          color="red"
        />

        <h1>Payment Failed</h1>

        <p>
          {error?.data?.message ||
            "Unable to verify payment."}
        </p>

        <Link to="/pay-fees">
          Try Again
        </Link>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          fontFamily: "Candara",
          padding: "30px",
        }}
      >
        <CheckCircle
          size={90}
          color="green"
        />

        <h1
          style={{
            color: "#0B3D91",
          }}
        >
          Payment Successful
        </h1>

        <p>
          Thank you for your payment.
        </p>

        <p>
          Reference:
          <br />
          <strong>
            {data.payment.paymentReference}
          </strong>
        </p>

        <p>
          Amount:
          <br />
          <strong>
            ₦
            {data.payment.amount.toLocaleString()}
          </strong>
        </p>

        <Link
          to="/"
          style={{
            marginTop: "30px",
            padding: "14px 30px",
            background: "#0B3D91",
            color: "#FFD700",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "700",
          }}
        >
          Return Home
        </Link>
      </div>
    );
  }

  return null;
}