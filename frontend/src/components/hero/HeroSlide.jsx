// ============================================================
// src/components/hero/HeroSlide.jsx
// ------------------------------------------------------------
// Premium Hero Slide
//
// Features
// • Ken Burns Animation
// • Fade Transition
// • Responsive Overlay
// • Professional Responsive Content
// • Modern CTA
// • Zero Black Bars
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSlide({ slide, active }) {
  return (
    <>
      <style>{`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

/* ==========================================
   Fade Animation
========================================== */

@keyframes fadeSlide{

0%{

opacity:0;

}

100%{

opacity:1;

}

}

/* ==========================================
   Ken Burns
========================================== */

@keyframes kenBurns{

0%{

transform:scale(1);

}

100%{

transform:scale(1.08);

}

}

/* ==========================================
   Hero Image
========================================== */

.hero-image{

width:100%;

height:100%;

object-fit:cover;

object-position:center center;

display:block;

user-select:none;



}

/* ==========================================
   Content
========================================== */

.hero-content{

position:absolute;

inset:0;

display:flex;

align-items:center;

z-index:3;

}

.hero-inner{

width:100%;

max-width:1280px;

margin:auto;

padding-inline:clamp(1.5rem,5vw,5rem);

}

.hero-text{

max-width:720px;

color:#fff;

}

.hero-title{

font-family:Poppins,sans-serif;

font-weight:800;

font-size:clamp(2rem,5vw,4.5rem);

line-height:1.1;

margin-bottom:1.4rem;

text-shadow:0 10px 35px rgba(0,0,0,.35);

}

.hero-subtitle{

font-family:Inter,sans-serif;

font-size:clamp(1rem,1.5vw,1.25rem);

line-height:1.8;

color:#F5F5F5;

max-width:640px;

margin-bottom:2.4rem;

}

/* ==========================================
   Mobile
========================================== */

@media(max-width:768px){

.hero-content{

align-items:flex-end;

}

.hero-inner{

padding-bottom:2rem;

}

.hero-title{

font-size:clamp(1.6rem,6vw,2.5rem);

margin-bottom:1rem;

}

.hero-subtitle{

font-size:.95rem;

line-height:1.6;

margin-bottom:1.5rem;

}

}

/* ==========================================
   Small Phones
========================================== */

@media(max-width:480px){

.hero-inner{

padding-inline:1.2rem;

padding-bottom:1.5rem;

}

.hero-title{

font-size:1.45rem;

}

.hero-subtitle{

display:none;

}

}

`}</style>

     <div
  style={{
    position: "absolute",
    inset: 0,

    opacity: active ? 1 : 0,
    visibility: active ? "visible" : "hidden",

    transition: "opacity 1s ease",

    animation: active ? "fadeSlide .9s ease" : "none",

    pointerEvents: active ? "auto" : "none",

    zIndex: active ? 5 : 1,
  }}
>
        {/* HERO IMAGE */}

        <img
          src={slide.image}
          alt={slide.title}
          loading="lazy"
          draggable="false"
          className="hero-image"
          style={{
            animation: active
              ? "kenBurns 10s linear forwards"
              : "none",
          }}
        />

        {/* OVERLAY */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,.58) 0%, rgba(0,0,0,.28) 55%, rgba(0,0,0,.08) 100%)",
            zIndex: 1,
          }}
        />

        {/* CONTENT */}

        <div className="hero-content">
          <div className="hero-inner">
            <div className="hero-text">
              <h1 className="hero-title">{slide.title}</h1>

              <p className="hero-subtitle">
                {slide.subtitle}
              </p>
            

              <Link
                to={slide.buttonLink}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".8rem",

                  background: "#FFD700",

                  color: "#8B0000",

                  padding: "16px 34px",

                  borderRadius: "999px",

                  fontFamily: "Poppins",

                  fontWeight: 700,

                  textDecoration: "none",

                  transition: ".35s",

                  boxShadow:
                    "0 15px 40px rgba(0,0,0,.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "#8B0000";

                  e.currentTarget.style.color =
                    "#FFD700";

                  e.currentTarget.style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "#FFD700";

                  e.currentTarget.style.color =
                    "#8B0000";

                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}
              >
                {slide.buttonText}

                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}