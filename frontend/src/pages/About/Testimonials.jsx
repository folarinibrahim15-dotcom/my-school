import React from "react";

import Footer from "../../components/Footer";

import TestimonialSlider from "../../components/testimonials/TestimonialSlider";
import TestimonialStats from "../../components/testimonials/TestimonialStats";
import TestimonialCTA from "../../components/testimonials/TestimonialCTA";

export default function Testimonials() {

  return (

    <>
{/* ======================================
              HERO SECTION
      ====================================== */}

      <section
        className="
        relative
        overflow-hidden
        bg-gradient-to-r
        from-[#0B3D91]
        via-[#1E40AF]
        to-[#2563EB]
        text-white
        py-28
        "
      >

        {/* Decorative Circles */}

        <div
          className="
          absolute
          w-96
          h-96
          rounded-full
          bg-white/5
          -top-32
          -left-20
          "
        ></div>

        <div
          className="
          absolute
          w-80
          h-80
          rounded-full
          bg-yellow-400/10
          -bottom-20
          -right-16
          "
        ></div>

        <div
          className="
          relative
          max-w-7xl
          mx-auto
          px-6
          text-center
          "
        >

    {/* Testimonial Badge */}
    <span
      style={{
        display: 'inline-block',
        backgroundColor: '#FFD700', // bright yellow
        color: '#8B0000',           // deep red text
        fontWeight: 700,
        fontSize: '1.5rem',
        paddingTop: '0.75rem',    
        paddingBottom: '0.75rem', 
        paddingLeft: '2.5rem',     // more side padding
        paddingRight: '2.5rem',    // more side padding
        borderBottomLeftRadius: '16px',  // only bottom corners
        borderBottomRightRadius: '16px',
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
        marginBottom: '2.5rem',
        letterSpacing: '0.5px'
      }}
    >
      Testimonials
    </span>

    {/* Heading */}
   <h1
  style={{
    fontSize: "clamp(2rem, 6vw, 4rem)",

    lineHeight: 1.15,

    fontWeight: 800,

    margin: "0 auto 1.5rem",

    letterSpacing: "-1px",

    textAlign: "center",

    maxWidth: "900px",

    paddingInline: "clamp(1rem, 5vw, 2rem)",

    boxSizing: "border-box",
  }}
>
  Voices of Excellence
</h1>
    {/* Paragraph */}
   {/* Paragraph */}
<p
  style={{
    maxWidth: "56rem",
    margin: "0 auto",
    marginBottom: "3rem",

    paddingInline: "clamp(1rem, 5vw, 2rem)",

    fontSize: "clamp(1rem, 2.2vw, 1.1rem)",

    color: "rgba(255, 255, 255, 0.9)",

    lineHeight: 1.8,

    fontWeight: 400,

    boxSizing: "border-box",
  }}
>
  The success of our students speaks through the
  experiences of parents, teachers and learners
  whose lives have been transformed by Sound Peace
  International Schools.
</p>

  </div>

</section>
     {/* ======================================
        QUICK STATS BAR
====================================== */}

<section
  className="
  bg-yellow-400
  py-16
  "
>

  <div
    className="
    max-w-7xl
    mx-auto
    px-6
    grid
    grid-cols-2
    md:grid-cols-4
    gap-8
    text-center
    "
  >

    <div>

      <h2 className="text-3xl font-bold">

        1500+

      </h2>

      <p>

        Students

      </p>

    </div>

    <div>

      <h2 className="text-3xl font-bold">

        98%

      </h2>

      <p>

        Success Rate

      </p>

    </div>

    <div>

      <h2 className="text-3xl font-bold">

        5+

      </h2>

      <p>

        Years

      </p>

    </div>

    <div>

      <h2 className="text-3xl font-bold">

        50+

      </h2>

      <p>

        Teachers

      </p>

    </div>

  </div>

</section>

      {/* ======================================
              TESTIMONIALS
      ====================================== */}

      <TestimonialSlider />

      {/* ======================================
              SCHOOL IMPACT
      ====================================== */}

      <TestimonialStats />

      {/* ======================================
              WHY FAMILIES TRUST US
      ====================================== */}

      <section
        className="
        py-24
        bg-gray-50
        "
      >

        <div className="why-choose-grid">
          
          {/* LEFT COLUMN - TEXT */}
          <div
            style={{
              paddingTop: '3rem',    
              paddingBottom: '3rem', 
              paddingLeft: '1rem',
              paddingRight: '1rem'  
            }}
          >

            <span
              style={{
                color: '#1D4ED8', // text-blue-700
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em' // tracking-widest
              }}
            >
              Why Parents Choose Us
            </span>

            <h2
              style={{
                fontSize: '2.25rem', // text-4xl
                fontWeight: 700,
                marginTop: '1.25rem', // mt-5
                marginBottom: '2rem', // mb-8
                lineHeight: 1.2
              }}
            >
              Building Futures Through
              Quality Education
            </h2>

            <p
              style={{
                color: '#4B5563', // text-gray-600
                lineHeight: '2rem', // leading-8
                marginBottom: '2rem' // mb-8
              }}
            >
              We provide an environment where academic
              excellence, leadership, innovation,
              discipline and moral values come together
              to prepare students for lifelong success.
            </p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: '#374151' // text-gray-700
              }}
            >
              <li style={{marginBottom: '1.25rem'}}>✔ Modern Classrooms & Learning Facilities</li>
              <li style={{marginBottom: '1.25rem'}}>✔ Qualified & Passionate Teachers</li>
              <li style={{marginBottom: '1.25rem'}}>✔ Excellent WAEC & JAMB Results</li>
              <li style={{marginBottom: '1.25rem'}}>✔ Strong Character Development</li>
              <li>✔ Safe & Conducive Learning Environment</li>
            </ul>

          </div>

          {/* RIGHT COLUMN - TESTIMONIAL CARD */}
          <div
            style={{
              backgroundColor: '#FFFFFF', // bg-white
              borderRadius: '1.5rem', // rounded-3xl
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // shadow-xl
              paddingTop: '2.5rem',     
              paddingBottom: '2.5rem',  
              paddingLeft: '2.5rem',    
              paddingRight: '2.5rem',   
              marginBottom: '3rem'      
            }}
          >

            <blockquote
              style={{
                fontSize: '1.5rem', // text-2xl
                fontStyle: 'italic',
                lineHeight: '2.5rem', // leading-10
                color: '#374151', // text-gray-700
                paddingTop: '1rem',     
                paddingBottom: '1rem',  
                paddingLeft: '1rem',    
                paddingRight: '1rem',   
                margin: 0
              }}
            >
              "Every child deserves an education that
              inspires confidence, builds character and
              unlocks unlimited potential."
            </blockquote>

            <div 
              style={{
                marginTop: '2rem', // mt-8
                paddingLeft: '1rem',   
                paddingRight: '1rem',  
                paddingBottom: '1rem'  
              }}
            >

              <h4
                style={{
                  fontWeight: 700,
                  fontSize: '1.25rem', // text-xl
                  paddingTop: '0.5rem',     
                  paddingBottom: '0.5rem',  
                  paddingLeft: '0.5rem',    
                  paddingRight: '0.5rem',   
                  margin: 0
                }}
              >
                Sound Peace International Schools
              </h4>

              <p 
                style={{
                  color: '#6B7280', // text-gray-500
                  paddingTop: '0.25rem',     
                  paddingBottom: '0.25rem',  
                  paddingLeft: '0.5rem',    
                  paddingRight: '0.5rem'    
                }}
              >
                Excellence • Discipline • Leadership
              </p>

            </div>

          </div>

        </div>

        {/* Add this CSS in your global.css or inside <style jsx> */}
        <style>{`
          .why-choose-grid {
            max-width: 80rem;
            margin: 0 auto;
            padding-left: 2rem;
            padding-right: 2rem;
            display: grid;
            grid-template-columns: 1fr; /* Mobile: 1 column */
            gap: 3rem;
            align-items: center;
          }

          /* Desktop: 2 columns on same line */
          @media (min-width: 1024px) {
            .why-choose-grid {
              grid-template-columns: 1fr 1fr;
              gap: 4rem;
            }
          }
        `}</style>



      </section>

      {/* ======================================
              CALL TO ACTION
      ====================================== */}

      <TestimonialCTA />

    </>

  );

}
