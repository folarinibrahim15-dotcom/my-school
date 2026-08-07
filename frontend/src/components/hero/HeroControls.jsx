import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroControls({
  visible,
  onPrevious,
  onNext,
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,

        zIndex: 9999,

        pointerEvents: "none",
      }}
    >
      {/* LEFT */}

      <button
        aria-label="Previous Slide"
        onClick={onPrevious}
        style={{
          position: "absolute",

          top: "50%",
          left: "clamp(14px,3vw,40px)",

          transform: "translateY(-50%)",

          width: "62px",
          height: "62px",

          borderRadius: "999px",

          border: "1px solid rgba(255,255,255,.25)",

          background: "rgba(0,0,0,.35)",

          backdropFilter: "blur(18px)",

          color: "#fff",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",

          transition: ".35s",

          opacity: visible ? 1 : 0,

          pointerEvents: "auto",

          zIndex: 10000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FFD700";
          e.currentTarget.style.color = "#8B0000";
          e.currentTarget.style.transform =
            "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "rgba(0,0,0,.35)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.transform =
            "translateY(-50%)";
        }}
      >
        <ChevronLeft size={30} />
      </button>

      {/* RIGHT */}

      <button
        aria-label="Next Slide"
        onClick={onNext}
        style={{
          position: "absolute",

          top: "50%",
          right: "clamp(14px,3vw,40px)",

          transform: "translateY(-50%)",

          width: "62px",
          height: "62px",

          borderRadius: "999px",

          border: "1px solid rgba(255,255,255,.25)",

          background: "rgba(0,0,0,.35)",

          backdropFilter: "blur(18px)",

          color: "#fff",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",

          transition: ".35s",

          opacity: visible ? 1 : 0,

          pointerEvents: "auto",

          zIndex: 10000,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FFD700";
          e.currentTarget.style.color = "#8B0000";
          e.currentTarget.style.transform =
            "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "rgba(0,0,0,.35)";
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.transform =
            "translateY(-50%)";
        }}
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
}