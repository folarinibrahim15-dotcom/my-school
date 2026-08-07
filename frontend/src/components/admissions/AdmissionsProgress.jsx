import React from "react";

import {
  FaUserGraduate,
  FaUsers,
  FaHeartbeat,
  FaFileUpload,
  FaClipboardCheck,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

export default function AdmissionsProgress({

  step,

  progress,

}) {

  const steps = [

    {
      title: "Child",
      icon: <FaUserGraduate />,
    },

    {
      title: "Parent",
      icon: <FaUsers />,
    },

    {
      title: "Medical",
      icon: <FaHeartbeat />,
    },

    {
      title: "Documents",
      icon: <FaFileUpload />,
    },

    {
      title: "Review",
      icon: <FaClipboardCheck />,
    },

    {
      title: "Payment",
      icon: <FaCreditCard />,
    },

    {
      title: "Complete",
      icon: <FaCheckCircle />,
    },

  ];

  return (

    <div
      className="
      bg-white
      border-b
      border-gray-200
      px-6
      md:px-10
      py-8
      "
    >

      {/* Heading */}

      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-3
        mb-8
        "
      >

        <div>

          <h2
            className="
            text-2xl
            md:text-3xl
            font-bold
            text-[#0B3D91]
            font-poppins
            "
          >

            Online Admission Application

          </h2>

          <p
            className="
            text-gray-500
            mt-2
            "
          >

            Complete all required steps to submit your application.

          </p>

        </div>

        <div
          className="
          text-right
          "
        >

          <span
            className="
            text-sm
            text-gray-500
            "
          >

            Progress

          </span>

          <h3
            className="
            text-3xl
            font-bold
            text-[#4CAF50]
            "
          >

            {progress}%

          </h3>

        </div>

      </div>

      {/* Progress Bar */}

      <div
        className="
        w-full
        h-4
        bg-gray-200
        rounded-full
        overflow-hidden
        mb-10
        "
      >

        <div
          className="
          h-full
          bg-[#4CAF50]
          rounded-full
          transition-all
          duration-700
          "
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* Step Indicators */}

      <div
        className="
        hidden
        lg:grid
        grid-cols-7
        gap-4
        "
      >

        {

          steps.map((item, index) => {

            const current = step === index + 1;

            const completed = step > index + 1;

            return (

              <div
                key={item.title}
                className="
                flex
                flex-col
                items-center
                "
              >

                <div
                  className={`
                  w-14
                  h-14
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-xl
                  transition-all
                  duration-300

                  ${
                    completed

                      ?

                      "bg-[#4CAF50] text-white"

                      :

                      current

                      ?

                      "bg-[#FFD700] text-black shadow-lg scale-110"

                      :

                      "bg-gray-200 text-gray-500"

                  }

                  `}
                >

                  {item.icon}

                </div>

                <span
                  className={`
                  mt-3
                  text-sm
                  font-medium

                  ${
                    current

                      ?

                      "text-[#0B3D91]"

                      :

                      completed

                      ?

                      "text-[#4CAF50]"

                      :

                      "text-gray-400"

                  }

                  `}
                >

                  {item.title}

                </span>

              </div>

            );

          })

        }

      </div>

      {/* Mobile */}

      <div
        className="
        lg:hidden
        text-center
        "
      >

        <div
          className="
          inline-flex
          items-center
          gap-3
          bg-blue-50
          rounded-full
          px-6
          py-3
          "
        >

          <div
            className="
            text-[#0B3D91]
            text-xl
            "
          >

            {steps[step - 1].icon}

          </div>

          <span
            className="
            font-semibold
            text-[#0B3D91]
            "
          >

            Step {step} of 7

          </span>

        </div>

      </div>

    </div>

  );

}