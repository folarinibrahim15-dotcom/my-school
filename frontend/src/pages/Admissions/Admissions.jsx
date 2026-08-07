import React, { useState } from "react";

import Footer from "../../components/Footer";

import admissionsContent from "../../data/admissionContent.js";

import AdmissionBanner from "../../components/admissions/AdmissionBanner";
import AdmissionSidebar from "../../components/admissions/AdmissionSidebar";
import AdmissionContent from "../../components/admissions/AdmissionContent";
import AdmissionQuote from "../../components/admissions/AdmissionQuote";

function Admissions() {

  const menuItems = Object.keys(admissionsContent);

  const [activeMenu, setActiveMenu] = useState(menuItems[0]);

  const current = admissionsContent[activeMenu];

  return (
    <>

      {/* ===============================
              TOP YELLOW BANNER
      =============================== */}

      <AdmissionBanner />



      {/* ===============================
        MAIN CONTENT
=============================== */}

      <section
        style={{
          paddingTop: '2rem',    // top
          paddingBottom: '4rem', // bottom
          paddingLeft: '1.5rem', // left
          paddingRight: '1.5rem' // right
        }}
        className="
          bg-transparent  /* remove white background */
          shadow-none     /* remove shadow */
        "
      >

        <div
          style={{
            paddingTop: '2rem',    // inner top padding
            paddingBottom: '2rem', // inner bottom padding  
            paddingLeft: '1rem',   // inner left padding
            paddingRight: '1rem'   // inner right padding
          }}
          className="
            max-w-7xl
            mx-auto
            bg-transparent
            rounded-2xl /* optional: soft corners if you want a card look */
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              gap-12
            "
          >

            {/* Sidebar */}
            <AdmissionSidebar
              menuItems={menuItems}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            {/* Main Content */}
            <AdmissionContent
              current={current}
            />

          </div>

        </div>

      </section>



      {/* ===============================
              QUOTE SECTION
      =============================== */}

      <AdmissionQuote />


    </>
  );

}

export default Admissions;