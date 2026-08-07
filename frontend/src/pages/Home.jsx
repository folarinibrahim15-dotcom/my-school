import React from "react";
import { Link } from "react-router-dom";

import hero from "../assets/images/hero.jpg";
import whySoundPeace from "../assets/images/why.jpg";
import admissions from "../assets/images/admission.jpg";
import facilities from "../assets/images/facilities.jpg";
import awards from "../assets/images/awards.jpg";
import testimonials from "../assets/images/testimonial.jpg";
import news from "../assets/images/news.jpg";
import computerLab from "../assets/images/computer-lab.jpg";

import { FaBookOpen } from "react-icons/fa";
// Import your existing footer
import Footer from "../components/Footer";
import HeroSlider from "../components/hero/HeroSlider";

export default function Home() {
const cards = [
  {
    img: whySoundPeace,
    title: "Why Sound Peace?",
    text: "As parents, choosing a school for our children is one of the most important decisions we will make. Here are 4 reasons to choose Sound Peace International Schools.",
    link: "/about/Mission",
  },

  {
    img: admissions,
    title: "Admissions",
    text: "Let your child learn in a school with a proven track record of excellence and outstanding academic performance.",
    link: "/admissions/ApplyOnline",
  },

  {
    img: facilities,
    title: "Facilities",
    text: "Our school features first-class facilities that enhance learning, creativity, comfort and all-round development.",
    link: "/facilities",
  },

  {
    img: awards,
    title: "Awards",
    text: "Our school has won numerous awards while our students continue to excel in academics and future careers.",
    link: "/curriculum",
  },

  {
    img: testimonials,
    title: "Testimonials",
    text: "Sound Peace International Schools stands out as a center of academic excellence, character development and holistic education.",
    link: "/About/Testimonials",
  },

  {
    img: news,
    title: "News",
    text: "Discover remarkable events, developments and activities happening across our school community.",
    link: "/news",
  },
];

return (

<div className="w-full bg-white font-inter">


<HeroSlider />

{/* ================= QUOTE SECTION ================= */}

{/* Full Width Yellow Section */}
<div style={{
  width: '100%',
  backgroundColor: '#FFD700',
  paddingTop: '30px',
  paddingBottom: '30px',
  paddingLeft: '60px',
  paddingRight: '60px'
}}>
  
  <p style={{
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'candara',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '1.8',
    letterSpacing: '-0.6px'
  }}>
    "Education comes alive when knowledge is transformed into character,
    purpose, and meaningful action. At Sound Peace International Schools,
    we prepare every learner not only for examinations, but for a lifetime
    of excellence and impact."
  </p>

</div>


{/* ================= FEATURES SECTION ================= */}
<section
  style={{
    backgroundColor: "#FFFFFF",

    paddingBlock: "clamp(60px, 8vw, 100px)",

    paddingInline: "clamp(1rem, 5vw, 4rem)",

    boxSizing: "border-box",
  }}
>
  {/* Heading */}

  <div
    style={{
      maxWidth: "800px",

      margin: "0 auto",

      marginBottom: "clamp(40px,6vw,60px)",

      textAlign: "center",
    }}
  >
    <h2
      style={{
        fontFamily: "Poppins,sans-serif",

        fontWeight: 800,

        fontSize: "clamp(2rem,5vw,2.4rem)",

        color: "#0B3D91",

        marginBottom: "1rem",

        paddingInline: "1rem",
      }}
    >
      Why Choose Sound Peace?
    </h2>

    <p
      style={{
        color: "#4B5563",

        fontSize: "clamp(.95rem,2vw,1.05rem)",

        lineHeight: 1.8,

        paddingInline: "1rem",
      }}
    >
      Discover what makes Sound Peace International Schools
      a leading institution for academic excellence and
      character building.
    </p>
  </div>

  {/* Cards */}

  <div
    style={{
      display: "grid",

      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",

      gap: "clamp(20px,3vw,40px)",

      maxWidth: "1320px",

      margin: "0 auto",
    }}
  >
    {cards.map((card, index) => (
      <div
        key={index}
        style={{
          background: "#fff",

          borderRadius: "20px",

          overflow: "hidden",

          minHeight: "520px",

          display: "flex",

          flexDirection: "column",

          boxShadow:
            "0 10px 30px rgba(0,0,0,.08)",

          transition:
            "transform .35s ease, box-shadow .35s ease",

          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateY(-8px)";

          e.currentTarget.style.boxShadow =
            "0 20px 45px rgba(0,0,0,.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform =
            "translateY(0)";

          e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.08)";
        }}
      >
        {/* Image */}

        <img
          src={card.img}
          alt={card.title}
          style={{
            width: "100%",

            height: "clamp(190px,24vw,240px)",

            objectFit: "cover",

            display: "block",

            transition: "transform .5s ease",
          }}
        />

        {/* Content */}

        <div
          style={{
            flex: 1,

            display: "flex",

            flexDirection: "column",

            padding: "clamp(1.2rem,3vw,2rem)",
          }}
        >
          <Link
            to={card.link}
            style={{
              textDecoration: "none",
            }}
          >
            <h3
              style={{
                fontFamily: "Poppins,sans-serif",

                fontWeight: 700,

                fontSize: "clamp(1.15rem,2vw,1.35rem)",

                color: "#8B0000",

                marginBottom: "1rem",

                lineHeight: 1.4,

                transition: ".3s",

                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  "#dc9f04";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  "#8B0000";
              }}
            >
              {card.title}
            </h3>
          </Link>

          <p
            style={{
              color: "#4B5563",

              fontSize: "clamp(.92rem,2vw,1rem)",

              lineHeight: 1.8,

              flex: 1,

              wordBreak: "break-word",

              overflowWrap: "anywhere",
            }}
          >
            {card.text}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

{/* ================= VIDEO SECTION ================= */}
<section style={{
  backgroundColor: '#EDEDED',
  paddingTop: '100px',
  paddingBottom: '100px',
  paddingLeft: '60px',
  paddingRight: '60px'
}}>

  <div style={{
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  }}>
    <h2 style={{
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '800',
      fontSize: '36px',
      color: '#8B0000',
      marginBottom: '20px',
      textAlign: 'center'
    }}>
      Watch Our School Video
    </h2>

    <p style={{
      color: '#4B5563',
      marginBottom: '50px',
      fontSize: '17px',
      textAlign: 'center',
    }}>
      Take a virtual tour and experience the Sound Peace learning environment.
    </p>

    <div style={{
      backgroundColor: '#EDEDED',
      padding: '12px',
      borderRadius: '20px',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
      maxWidth: '900px',
      margin: '0 auto' // centers the video box
    }}>
      <img
        src={computerLab}
        alt="School Video"
        style={{
          width: '100%',
          borderRadius: '12px',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </div>
  </div>
</section>




{/* Divider with Center Icon */}
<div style={{
  width: '100%',
  paddingLeft: '70px',
  paddingRight: '70px',
  position: 'relative',
  marginTop: '70px',
  marginBottom: '60px'
}}>

  {/* The Line */}
  <div style={{
    width: '100%',
    height: '1.5px',
    backgroundColor: '#D1D5DB'
  }}></div>

  {/* The Circle Icon in the Middle */}
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F3F4F6',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid #E5E7EB'
  }}>
    
    {/* Book Icon SVG */}
  <FaBookOpen style={{fontSize: '22px', color: '#9CA3AF'}} />
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      <path d="M2 4v16c0 1.1.9 2 2 2h2V4H4c-1.1 0-2 .9-2 2zm14 0v18h2c1.1 0 2-.9 2-2V4h-4z"/>
    
  </div>
</div>





{/* ================= ADMISSION CTA ================= */}



<section

className="
w-full
bg-[#FFD700]
"
>



</section>

{/* Center Wrapper - no yellow here */}
<div style={{
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '80px',
  paddingBottom: '80px',
}}>

  {/* Yellow Box - only around text */}
  <Link to="/admissions/ApplyOnline"
    style={{
      backgroundColor: '#FFD700',
      color: '#0B1A4D',
      fontSize:'20px',
      fontFamily: 'montserrat',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '1.25rem',
      paddingBottom: '1.25rem',
      paddingLeft: '2.5rem',
      paddingRight: '2.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      display: 'inline-block',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = '#002C85';
      e.currentTarget.style.color = '#FFD700';
      e.currentTarget.style.transform = 'translateY(-3px)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = '#FFD700';
      e.currentTarget.style.color = '#0B1A4D';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    APPLY FOR ADMISSION
  </Link>

</div>

    <p style={{
      color: '#4B5563',
      marginBottom: '40px',
      fontSize: '17px',
      textAlign: 'center',
    }}>
      Only takes a few minutes online!
    </p>

</div>


);
}