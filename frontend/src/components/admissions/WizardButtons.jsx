import React from "react";

import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export default function WizardButtons({

  step,

  onPrevious,

  onNext,

}) {

  return (

    <div
      className="
      border-t
      border-gray-200
      bg-gray-50
      px-6
      md:px-10
      py-6
      "
    >

      <div
        className="
        flex
        flex-col
        sm:flex-row
        items-center
        justify-between
        gap-4
        "
      >

        {/* Previous Button */}

        <button
          type="button"
          onClick={onPrevious}
          disabled={step === 1}
          className={`
          flex
          items-center
          justify-center
          gap-3
          w-full
          sm:w-auto
          px-8
          py-3
          rounded-xl
          font-semibold
          transition-all
          duration-300

          ${
            step === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:-translate-y-0.5"
          }
          `}
        >

          <FaArrowLeft />

          Previous

        </button>



        {/* Step Indicator */}

        <div
          className="
          hidden
          md:flex
          items-center
          justify-center
          "
        >

          <span
            className="
            text-gray-500
            font-medium
            "
          >

            Step {step} of 7

          </span>

        </div>



        {/* Next Button */}

        <button
          type="button"
          onClick={onNext}
          className="
          flex
          items-center
          justify-center
          gap-3
          w-full
          sm:w-auto
          px-10
          py-3
          rounded-xl
          bg-[#FFD700]
          text-black
          font-bold
          shadow-md
          transition-all
          duration-300
          hover:bg-[#FFC300]
          hover:shadow-xl
          hover:-translate-y-1
          active:scale-95
        "
        >

          Next

          <FaArrowRight />

        </button>

      </div>

    </div>

  );

}