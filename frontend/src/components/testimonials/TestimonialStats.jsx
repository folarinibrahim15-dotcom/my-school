import React from "react";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaAward,
  FaSchool
} from "react-icons/fa";

const stats = [

  {
    id: 1,

    icon: <FaUserGraduate size={45} />,

    number: "1,500+",

    title: "Students Enrolled",

    description:
      "Empowering learners with quality education every year.",

    color: "#2563EB"
  },

  {
    id: 2,

    icon: <FaAward size={45} />,

    number: "98%",

    title: "Graduation Success",

    description:
      "Consistent outstanding academic performance and examination success.",

    color: "#FACC15"
  },

  {
    id: 3,

    icon: <FaSchool size={45} />,

    number: "15+",

    title: "Years of Excellence",

    description:
      "Providing world-class education with integrity and innovation.",

    color: "#16A34A"
  },

  {
    id: 4,

    icon: <FaChalkboardTeacher size={45} />,

    number: "120+",

    title: "Qualified Teachers",

    description:
      "Experienced professionals dedicated to student success.",

    color: "#DC2626"
  }

];

export default function TestimonialStats() {

  return (

        <section
        style={{
            paddingTop: '6rem',     // py-24
            paddingBottom: '6rem',  // py-24
            paddingLeft: '2rem',    // added
            paddingRight: '2rem',   // added
            backgroundColor: '#FFFFFF' // bg-white
        }}
        >

        <div
            style={{
            maxWidth: '80rem', // max-w-7xl
            margin: '0 auto',  
            paddingLeft: '1.5rem',  // px-6
            paddingRight: '1.5rem'  // px-6
            }}
        >

            {/* Heading */}
            <div 
            style={{
                textAlign: 'center',  // centered
                marginBottom: '4rem'  // mb-16
            }}
            >

            <h2
                style={{
                fontSize: '2.25rem', // text-4xl
                fontWeight: 700,
                fontFamily: 'Poppins, sans-serif',
                color: '#111827', // text-gray-900
                paddingTop: '1rem',     // padding all sides
                paddingBottom: '1rem',  
                paddingLeft: '1rem',    
                paddingRight: '1rem',   
                margin: 0,
                textAlign: 'center'     // centered
                }}
            >
                Our Impact In Numbers
            </h2>

            <p
                style={{
                marginTop: '1.25rem', // mt-5
                maxWidth: '48rem', // max-w-3xl
                margin: '1.25rem auto 0 auto', // mx-auto + mt-5
                color: '#4B5563', // text-gray-600
                lineHeight: '2rem', // leading-8
                fontSize: '1.125rem', // text-lg
                paddingTop: '1rem',     // padding all sides
                paddingBottom: '1rem',  
                paddingLeft: '1rem',    
                paddingRight: '1rem',   
                textAlign: 'center'     // centered
                }}
            >
                Every achievement reflects our commitment to academic excellence,
                leadership development, innovation, and the holistic growth of
                every learner.
            </p>

            </div>

        {/* Cards */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-8
          "
        >

          {

            stats.map((item) => (

              <div

                key={item.id}

                className="
                bg-white
                rounded-3xl
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
                p-8
                text-center
                border
                border-gray-100
                "

              >

                <div
                  className="
                  flex
                  justify-center
                  mb-6
                  "
                  style={{
                    color: item.color
                  }}
                >

                  {item.icon}

                </div>

                <h3
                  className="
                  text-5xl
                  font-extrabold
                  mb-3
                  "
                  style={{
                    color: item.color
                  }}
                >

                  {item.number}

                </h3>

                <h4
                  className="
                  text-xl
                  font-bold
                  text-gray-900
                  mb-4
                  "
                >

                  {item.title}

                </h4>

                <p
                  className="
                  text-gray-600
                  leading-7
                  "
                >

                  {item.description}

                </p>

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}
