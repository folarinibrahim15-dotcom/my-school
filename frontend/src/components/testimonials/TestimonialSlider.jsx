import React from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import testimonialsData from "../../data/testimonialsData";

import TestimonialCard from "./TestimonialCard";

export default function TestimonialSlider() {

  const settings = {

    dots: true,

    infinite: true,

    speed: 700,

    slidesToShow: 3,

    slidesToScroll: 1,

    autoplay: true,

    autoplaySpeed: 5000,

    pauseOnHover: true,

    arrows: true,

    responsive: [

      {
        breakpoint: 1024,

        settings: {

          slidesToShow: 2,

        },

      },

      {
        breakpoint: 768,

        settings: {

          slidesToShow: 1,

          arrows: false,

        },

      },

    ],

  };

  return (

    <section
  style={{
    paddingTop: '2rem',    // py-24
    paddingBottom: '2rem', // py-24
    paddingLeft: '2rem',   // added
    paddingRight: '2rem',  // added
    backgroundColor: '#F9FAFB' // bg-gray-50
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

    {/* Section Header */}
    <div 
      style={{
        textAlign: 'center',
        marginBottom: '4rem' // mb-16
      }}
    >

      <h2
        style={{
          fontSize: '2.25rem', // text-4xl
          fontWeight: 700,
          color: '#111827', // text-gray-900
          fontFamily: 'Poppins, sans-serif',
          paddingTop: '1rem',     // added padding
          paddingBottom: '1rem',  // added padding
          paddingLeft: '1rem',    // added padding
          paddingRight: '1rem',   // added padding
          margin: 0
        }}
      >
        What Our Community Says
      </h2>

      <p
        style={{
          marginTop: '0.4rem', // mt-4
          color: '#6B7280', // text-gray-500
          fontSize: '1.125rem', // text-lg
          maxWidth: '48rem', // max-w-3xl
          margin: '1rem auto 0 auto', // mx-auto
          lineHeight: '2rem', // leading-8
          paddingLeft: '1rem',   // added padding
          paddingRight: '1rem'   // added padding
        }}
      >
        Hear directly from parents, students,
        teachers and alumni whose lives have
        been positively impacted by
        Sound Peace International Schools.
      </p>

    </div>

    <Slider {...settings}>

      {
        testimonialsData.map((testimonial) => (
          <div
            key={testimonial.id}
            style={{
              paddingLeft: '1rem',  // px-4
              paddingRight: '1rem'  // px-4
            }}
          >

            {/* Wrapper to add padding around each card for spacing */}
            <div
              style={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                height: '100%'
              }}
            >
              <TestimonialCard
                testimonial={testimonial}
              />
            </div>

          </div>
        ))
      }

    </Slider>

  </div>

</section>

  );

}