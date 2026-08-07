// ============================================================
// src/components/hero/HeroDots.jsx
// ------------------------------------------------------------
// Premium Hero Slider Pagination
//
// Features
// • Animated Active Dot
// • Click Navigation
// • Glassmorphism Container
// • Responsive
// • Accessible
// ============================================================

import React from "react";

export default function HeroDots({
  totalSlides,
  currentSlide,
  onSelect,
}) {
  return (
    <>
      <style>{`

        @keyframes dotAppear{

          from{
            opacity:0;
            transform:translateY(10px);
          }

          to{
            opacity:1;
            transform:translateY(0);
          }

        }

      `}</style>

      <div
        style={{
          position: "absolute",
          bottom: "clamp(20px,4vw,40px)",
          left: "50%",
          transform: "translateX(-50%)",

          display: "flex",
          alignItems: "center",
          gap: "12px",

          padding: "10px 18px",

          borderRadius: "999px",

          background: "rgba(255,255,255,.10)",

          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",

          border: "1px solid rgba(255,255,255,.15)",

          boxShadow: "0 10px 30px rgba(0,0,0,.20)",

          animation: "dotAppear .6s ease",

          zIndex: 20,
        }}
      >
        {Array.from({ length: totalSlides }).map((_, index) => {
          const active = index === currentSlide;

          return (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => onSelect(index)}
              style={{
                width: active ? "36px" : "12px",
                height: "12px",

                borderRadius: "999px",

                border: "none",

                cursor: "pointer",

                outline: "none",

                background: active
                  ? "#FFD700"
                  : "rgba(255,255,255,.55)",

                transition: "all .35s ease",

                boxShadow: active
                  ? "0 0 18px rgba(255,215,0,.65)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,.9)";
                  e.currentTarget.style.transform =
                    "scale(1.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background =
                    "rgba(255,255,255,.55)";
                  e.currentTarget.style.transform =
                    "scale(1)";
                }
              }}
            />
          );
        })}
      </div>
    </>
  );
}