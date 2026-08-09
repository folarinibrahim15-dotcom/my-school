import React from "react";
import logoo from "../assets/images/logoo.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaRss,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ width: "100%", backgroundColor: "#0A1F73", color: "#FFFFFF" }}>

      {/* ================= MAIN FOOTER ================= */}
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "5rem 2rem", // breathing space top/bottom
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "7rem",
            flexWrap: "wrap",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", flex: "1 1 400px" }}>
            <img
              src={logoo}
              alt="Sound Peace International Schools"
              style={{
                width: "240px",
                height: "auto",
                objectFit: "contain",
                maxWidth: "100%",
              }}
            />
          </div>

          {/* Contact */}
          <div
            style={{
              flex: "1 1 400px",
              maxWidth: "420px",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                color: "#FFD700",
                fontWeight: 800,
                fontSize: "1.5rem",
                textTransform: "uppercase",
                fontFamily: "Poppins, sans-serif",
                marginBottom: "2rem",
                letterSpacing: "1px",
              }}
            >
              Contact Us
            </h3>

            {/* Address */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
              <FaMapMarkerAlt style={{ color: "#9DAECF", marginTop: "20px", flexShrink: 0 }} />
              <p style={{ color: "#9DAECF", lineHeight: 1.8, margin: 0 }}>
                5, Sound Peace Crescent Opposite
                <br />
                ABC Garden, Alababi Road
                <br />
                Sojuolu, Ewekoro
                <br />
                Ogun State
              </p>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
              <FaPhoneAlt style={{ color: "#9DAECF", marginTop: "20px", flexShrink: 0 }} />
              <p style={{ color: "#9DAECF", lineHeight: 1.8, margin: 0 }}>
                +234 (0) 803 855 5951
                <br />
                +234 (0) 806 226 5559
              </p>
            </div>

            {/* Email */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <FaEnvelope style={{ color: "#9DAECF", marginTop: "4px", flexShrink: 0 }} />
              <p style={{ color: "#9DAECF", margin: 0, wordBreak: "break-word" }}>
                soundpeaceinternationalschools@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* ================= FULL WIDTH DIVIDER ================= */}
      <div style={{ width: "100%", borderTop: "2px solid #FFFFFF" }}></div>


      {/* ================= BOTTOM BAR ================= */}
      <div
        style={{
          padding: "1.5rem 2rem", // padding top right bottom left
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            lineHeight: 1.7,
            fontWeight: 500,
            margin: 0,
          }}
        >
          <span style={{ color: "#FFD700" }}>COPYRIGHT 2026 SOUND PEACE SCHOOLS</span>
          <span style={{ display: "inline", margin: "0 8px" }}> | </span>
          <span style={{ color: "#FFD700" }}>ALL RIGHTS RESERVED</span>
          <span style={{ display: "inline", margin: "0 8px" }}> | </span>
          WEBSITE BY <strong>Eazzy WebDev</strong>
        </p>

          {/* Social Icons */}

          <div
            className="
            flex

            items-center

            gap-5

            text-xl
            "
          >

            <a
              href="#"
              className="
              w-10
              h-10

              rounded-full

              flex
              items-center
              justify-center

              bg-white/10

              hover:bg-yellow-400

              hover:text-[#0A1F73]

              transition-all

              duration-300
              "
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="
              w-10
              h-10

              rounded-full

              flex
              items-center
              justify-center

              bg-white/10

              hover:bg-yellow-400

              hover:text-[#0A1F73]

              transition-all

              duration-300
              "
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="
              w-10
              h-10

              rounded-full

              flex
              items-center
              justify-center

              bg-white/10

              hover:bg-yellow-400

              hover:text-[#0A1F73]

              transition-all

              duration-300
              "
            >
              <FaRss />
            </a>

            <a
              href="mailto:sound.peace.educators@gmail.com"
              className="
              w-10
              h-10

              rounded-full

              flex
              items-center
              justify-center

              bg-white/10

              hover:bg-yellow-400

              hover:text-[#0A1F73]

              transition-all

              duration-300
              "
            >
              <FaEnvelope />
            </a>

          </div>
      </div>
    </footer>
  );
}
