import React from "react";
import { Link } from "react-router-dom";

function AdmissionContent({ current }) {
  return (
        <section className="flex-1">
          <div className="p-4 md:p-8 lg:p-10">
            {/* PAGE TITLE */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-10 font-poppins">
              {current.title}
            </h2>

            {/* FEATURE IMAGE */}
            <div className="overflow-hidden rounded-2xl shadow-xl mt-8 mb-12">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* SUBTITLE */}
            {current.subtitle && (
              <p className="text-lg text-gray-600 leading-8 mb-10 font-medium tracking-normal">
                {current.subtitle}
              </p>
            )}

            {/* PARAGRAPHS */}
            <div className="space-y-8 mb-12">
              {current.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-9 text- tracking-normal">
                  {paragraph}
                </p>
              ))}
            </div>
            {/* CSS BANNER CTA - ONLY FOR ACCEPT ADMISSION */}
            {current.title === "Accept Admission" && (
              <Link to="/Admissions/AcceptAdmission"
                className="
                  group
                  block
                  w-full
                  max-w-2xl /* reduced width so it's not full screen */
                  mx-auto /* center it */
                  bg-[#FFD700]
                  rounded-xl /* slightly less rounded for modern look */
                  shadow-lg
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  ease-out
                  overflow-hidden
                  flex
                  items-center
                  cursor-pointer
                  mb-12
                  hover:-translate-y-1 /* lift effect on hover */
                "
              >
                {/* Blue Left Accent Bar */}
                <div 
                  className="
                    w-2 /* thinner bar */
                    h-full
                    bg-[#0B3D91]
                    transition-all
                    duration-300
                    group-hover:w-3 /* grows on hover */
                  "
                  style={{ minHeight: '80px' }} /* reduced height */
                ></div>

                {/* Text */}
                <h3 
                  style={{ letterSpacing: '2px', fontWeight: 700 }}
                  className="
                    flex-1
                    text-center
                    text-black
                    text-xl /* reduced from 2xl */
                    md:text-2xl
                    lg:text-3xl
                    font-poppins
                    uppercase
                    py-6 /* reduced padding */
                    px-6
                    transition-transform
                    duration-300
                    group-hover:scale-105 /* text scales slightly */
                  "
                >
                  ACCEPT ADMISSION
                </h3>

                {/* Arrow Icon on Hover */}
                <div className="
                  pr-6 
                  text-black 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-all 
                  duration-300 
                  group-hover:translate-x-1
                ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )}

            {/* OPTIONAL INFORMATION BOX */}
            {current.note && (
              <div className="mt-12 rounded-xl border-l-4 border-[#FFD700] bg-yellow-50 p-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900 tracking-normal">
                  Important Information
                </h3>
                <p className="text-gray-700 leading-8 tracking-normal">{current.note}</p>
              </div>
            )}

            {/* CONTACT CARD */}
            {current.contact && (
              <div className="mt-12 rounded-xl bg-[#0B3D91] p-7 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-4 tracking-normal">Need Assistance?</h3>
                <p className="leading-8 text-gray-100 tracking-normal">{current.contact}</p>
              </div>
            )}
          </div>
        </section>
  );
}

export default AdmissionContent;