import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";

import AcceptBanner from "../../components/acceptAdmission/AcceptBanner";
import acceptAdmissionContent from "../../data/acceptAdmissionContent";

import {
  useInitializePaymentMutation,
} from "../../redux/api/paymentApi";

export default function AcceptAdmission() {
  const navigate = useNavigate();

  const { hero, paymentStep, button, quote } =
    acceptAdmissionContent;

  const [isBtnHover, setIsBtnHover] = useState(false);
  const [isHeaderHover, setIsHeaderHover] = useState(false);

  const [
    initializePayment,
    { isLoading },
  ] = useInitializePaymentMutation();

  const btnBg = isBtnHover ? "#FFD700" : "#8B0000";
  const btnColor = isBtnHover ? "#8B0000" : "#FFD700";

  const headerBg = isHeaderHover
    ? "linear-gradient(180deg,#FF6B6B 0%,#FFB3B3 100%)"
    : "linear-gradient(180deg,#FFB3B3 0%,#FF6B6B 100%)";

  const handlePayment = async () => {
    try {
      const admissionId =
        localStorage.getItem("admissionId");

      if (!admissionId) {
        alert(
          "Admission record not found. Kindly complete the admission form first."
        );

        navigate("/admission");

        return;
      }

      const response =
        await initializePayment({
          admissionId,
        }).unwrap();

      if (response.authorization_url) {
        window.location.href =
          response.authorization_url;
      } else {
        alert("Unable to start payment.");
      }
    } catch (error) {
      console.log(error);

      alert(
        error?.data?.message ||
          "Unable to initialize payment."
      );
    }
  };

  return (
    <main
      style={{
        fontFamily: "Candara",
        background: "#fff",
      }}
    >
      <AcceptBanner />

      <section
        style={{
          padding: "3rem 1rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          {/* LEFT */}

          <div>
            <h1
              style={{
                fontSize:
                  "clamp(1.7rem,4vw,3rem)",
                fontWeight: 600,
                lineHeight: 1.35,
                color: "#2f2f2f",
              }}
            >
              {hero.heading}
            </h1>
          </div>

          {/* RIGHT */}

          <div>
            <div
              onMouseEnter={() =>
                setIsHeaderHover(true)
              }
              onMouseLeave={() =>
                setIsHeaderHover(false)
              }
              style={{
                background: headerBg,
                padding: "1rem",
                textAlign: "center",
                marginBottom: "2rem",
                transition: ".3s",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#5C0000",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                {paymentStep.title}
              </h3>
            </div>

            {paymentStep.items.map((item, index) => (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "1rem 0",
                  }}
                >
                  <span
                    style={{
                      color: "#8B0000",
                      fontWeight: "bold",
                    }}
                  >
                    ✓
                  </span>

                  <p
                    style={{
                      margin: 0,
                      lineHeight: 1.8,
                    }}
                  >
                    <strong>{item.title}</strong>

                    {item.description &&
                      ` ${item.description}`}
                  </p>
                </div>

                {index !==
                  paymentStep.items.length - 1 && (
                  <hr />
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handlePayment}
              disabled={isLoading}
              onMouseEnter={() =>
                setIsBtnHover(true)
              }
              onMouseLeave={() =>
                setIsBtnHover(false)
              }
              style={{
                width: "100%",
                padding: "16px",
                marginTop: "2rem",
                background: btnBg,
                color: btnColor,
                border: "none",
                fontWeight: 700,
                cursor: isLoading
                  ? "not-allowed"
                  : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                transition: ".3s",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              <FaThumbsUp />

              {isLoading
                ? "INITIALIZING PAYMENT..."
                : button.text}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <section
        style={{
          background: "#002A8F",
          padding: "4rem 1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#fff",
            fontSize:
              "clamp(1.3rem,4vw,2rem)",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          "{quote.text}"
        </p>

        <div
          style={{
            width: "600px",
            maxWidth: "100%",
            height: "3px",
            background: "#FFD700",
            margin: "0 auto",
          }}
        />
      </section>
    </main>
  );
}