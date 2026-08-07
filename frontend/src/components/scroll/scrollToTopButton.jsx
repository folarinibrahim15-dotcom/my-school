// =============================================================
// src/components/scroll/ScrollToTopButton.jsx
//--------------------------------------------------------------
// Premium Scroll To Top Button
//
// Features
// • Glassmorphism
// • Circular Progress Ring
// • Smooth Fade Animation
// • Ripple Hover Glow
// • Mobile Responsive
// • Floating Shadow
// • Scroll Percentage
// • Accessible
// =============================================================

import React from "react";
import { ArrowUp } from "lucide-react";
import useScrollPosition from "../../hooks/useScrollPositions"

export default function ScrollToTopButton() {
  const {
    showButton,
    scrollProgress,
    scrollToTop,
  } = useScrollPosition();

  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (scrollProgress / 100) * circumference;

  return (
    <>
      <style>{`

      @keyframes scrollButtonFade{

        from{

          opacity:0;

          transform:translateY(35px) scale(.85);

        }

        to{

          opacity:1;

          transform:translateY(0) scale(1);

        }

      }

      @keyframes pulseGlow{

        0%{

          box-shadow:0 10px 25px rgba(0,0,0,.18);

        }

        50%{

          box-shadow:0 0 30px rgba(255,215,0,.45);

        }

        100%{

          box-shadow:0 10px 25px rgba(0,0,0,.18);

        }

      }

      .scroll-top-btn{

          position:fixed;

          right:clamp(16px,2vw,36px);

          bottom:clamp(18px,3vw,36px);

          width:64px;

          height:64px;

          border-radius:999px;

          border:none;

          outline:none;

          cursor:pointer;

          display:flex;

          align-items:center;

          justify-content:center;

          background:rgba(17,24,39,.45);

          backdrop-filter:blur(18px);

          -webkit-backdrop-filter:blur(18px);

          border:1px solid rgba(255,215,0,.25)

          box-shadow:
                  0 12px 30px rgba(0,0,0,.25),
                  0 0 0 1px rgba(255,255,255,.05);
                    transition:.35s ease;

          z-index:9999;

          animation:scrollButtonFade .45s ease;

      }

      .scroll-top-btn:hover{

          transform:translateY(-6px) scale(1.08);

          background:#FFD700;
          

          animation:pulseGlow 2s infinite;

      }

      .scroll-top-btn:active{

          transform:scale(.94);

      }

      @media(max-width:768px){

          .scroll-top-btn{

              width:54px;

              height:54px;

              right:16px;

              bottom:20px;

          }

      }

      `}</style>

      {showButton && (
        <button
          aria-label="Scroll Back To Top"
          className="scroll-top-btn"
          onClick={scrollToTop}
        >
          {/* Progress Ring */}

          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(-90deg)",
            }}
          >
            {/* Background Ring */}

            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,.20)"
              strokeWidth="3"
            />

            {/* Progress */}

            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#FFD700"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition:
                  "stroke-dashoffset .2s linear",
              }}
            />
          </svg>

          {/* Arrow */}

          <ArrowUp
            size={24}
            strokeWidth={2.8}
            style={{
              color:"#ffffff",
              position: "relative",
              zIndex: 5,
              transition: ".3s",
            }}
          />
        </button>
      )}
    </>
  );
}