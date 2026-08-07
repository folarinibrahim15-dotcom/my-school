import React from "react";

import AdmissionsBanner from "../../components/admissions/AdmissionsBanner";
import PassportUpload from "../../components/admissions/PassportUpload";
import AdmissionProgress from "../../components/admissions/AdmissionProgress";
import AdmissionForm from "../../components/admissions/AdmissionForm";

import Footer from "../../components/Footer";

export default function ApplicationPage() {

  return (

    <>

      {/* ======================================
              TOP BANNER
      ====================================== */}

      <AdmissionsBanner />



      {/* ======================================
              MAIN APPLICATION SECTION
      ====================================== */}

      <section
        className="
        bg-[#F8FAFC]
        py-14
        px-5
        md:px-8
        lg:px-12
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto
          "
        >

          <div
            className="
            grid
            lg:grid-cols-[320px_1fr]
            gap-12
            items-start
            "
          >

            {/* LEFT SIDE */}

            <div
              className="
              lg:sticky
              lg:top-28
              "
            >

              <PassportUpload />

            </div>



            {/* RIGHT SIDE */}

            <div>

              <AdmissionProgress
                progress={25}
              />

              <AdmissionForm />

            </div>

          </div>

        </div>

      </section>

     
{/* ======================================
              BLUE QUOTE SECTION
      ====================================== */}

      <section style={{
        width: '100%',
        backgroundColor: '#0b2485', // exact dark blue from img
        paddingTop: '60px',        // MORE top padding
        paddingBottom: '60px',     // MORE bottom padding
        paddingLeft: '24px',
        paddingRight: '24px',
        textAlign: 'center'         // center everything
      }}>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>

          <h2
            style={{
              color: '#FFFFFF',
              fontSize: '28px',
              fontWeight: '400',        // regular like in img
              lineHeight: '1.5',
              margin: 0
            }}
            className="md:text-3xl lg:text-4xl"
          >
            “I have learned over the years that when one’s<br/>
            mind is made up, this diminishes fear; knowing<br/>
            what must be done does away with fear.”
          </h2>

          <div style={{ marginTop: '40px' }}>

          </div>

          <div
            style={{
              width: '75%',
              maxWidth: '700px',
              height: '2px',
              backgroundColor: '#FFD700', // gold line like img
              margin: '40px auto 0 auto'
            }}
            className="md:w-2/3"
          />

        </div>

      </section>


    </>

  );

}