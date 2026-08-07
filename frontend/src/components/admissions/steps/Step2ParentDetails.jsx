
import React from "react";

import {
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaBriefcase,
  FaHome,
  FaUsers,
} from "react-icons/fa";

export default function Step2ParentDetails({

  formData,

  handleChange,

}) {

  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      border
      border-gray-100
      p-6
      md:p-10
      space-y-10
      "
    >

      {/* Heading */}

      <div>

        <h2
          className="
          text-3xl
          font-bold
          text-[#0B3D91]
          "
        >

          Parent / Guardian Information

        </h2>

        <p
          className="
          mt-2
          text-gray-500
          "
        >

          Kindly provide the contact details of the child's parent or guardian.

        </p>

      </div>

      {/* Parent Names */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <div>

          <label className="font-semibold">

            Father's Full Name *

          </label>

          <div className="relative mt-2">

            <FaUserTie
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="
              w-full
              pl-12
              p-4
              rounded-xl
              border
              border-gray-300
              focus:ring-2
              focus:ring-[#0B3D91]
              outline-none
              "
            />

          </div>

        </div>

        <div>

          <label className="font-semibold">

            Mother's Full Name *

          </label>

          <div className="relative mt-2">

            <FaUserTie
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className="
              w-full
              pl-12
              p-4
              rounded-xl
              border
              border-gray-300
              focus:ring-2
              focus:ring-[#0B3D91]
              outline-none
              "
            />

          </div>

        </div>

      </div>

      {/* Contact */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <div>

          <label className="font-semibold">

            Primary Phone Number *

          </label>

          <div className="relative mt-2">

            <FaPhoneAlt
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <input
              type="tel"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              className="
              w-full
              pl-12
              p-4
              rounded-xl
              border
              border-gray-300
              focus:ring-2
              focus:ring-[#0B3D91]
              outline-none
              "
            />

          </div>

        </div>

        <div>

          <label className="font-semibold">

            Email Address *

          </label>

          <div className="relative mt-2">

            <FaEnvelope
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
              onChange={handleChange}
              className="
              w-full
              pl-12
              p-4
              rounded-xl
              border
              border-gray-300
              focus:ring-2
              focus:ring-[#0B3D91]
              outline-none
              "
            />

          </div>

        </div>

      </div>

      {/* Occupation */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <div>

          <label className="font-semibold">

            Occupation

          </label>

          <div className="relative mt-2">

            <FaBriefcase
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="
              w-full
              pl-12
              p-4
              rounded-xl
              border
              border-gray-300
              "
            />

          </div>

        </div>

        <div>

          <label className="font-semibold">

            Employer / Company

          </label>

          <input
            type="text"
            name="employer"
            value={formData.employer}
            onChange={handleChange}
            className="
            mt-2
            w-full
            p-4
            rounded-xl
            border
            border-gray-300
            focus:ring-2
            focus:ring-[#0B3D91]
            outline-none
            "
          />

        </div>

      </div>

      {/* Home Address */}

      <div>

        <label className="font-semibold">

          Residential Address *

        </label>

        <div className="relative mt-2">

          <FaHome
            className="
            absolute
            left-4
            top-6
            text-gray-400
            "
          />

          <textarea
            rows="4"
            name="parentAddress"
            value={formData.parentAddress}
            onChange={handleChange}
            className="
            w-full
            pl-12
            p-4
            rounded-xl
            border
            border-gray-300
            resize-none
            focus:ring-2
            focus:ring-[#0B3D91]
            outline-none
            "
          />

        </div>

      </div>

      {/* Emergency Contact */}

      <div
        className="
        bg-blue-50
        rounded-2xl
        p-6
        space-y-5
        "
      >

        <h3
          className="
          text-xl
          font-bold
          text-[#0B3D91]
          flex
          items-center
          gap-3
          "
        >

          <FaUsers />

          Emergency Contact

        </h3>

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          "
        >

          <input
            type="text"
            name="emergencyName"
            placeholder="Contact Person"
            value={formData.emergencyName}
            onChange={handleChange}
            className="
            p-4
            rounded-xl
            border
            border-gray-300
            "
          />

          <input
            type="tel"
            name="emergencyPhone"
            placeholder="Phone Number"
            value={formData.emergencyPhone}
            onChange={handleChange}
            className="
            p-4
            rounded-xl
            border
            border-gray-300
            "
          />

          <input
            type="text"
            name="relationship"
            placeholder="Relationship to Child"
            value={formData.relationship}
            onChange={handleChange}
            className="
            p-4
            rounded-xl
            border
            border-gray-300
            "
          />

          <input
            type="text"
            name="emergencyAddress"
            placeholder="Address"
            value={formData.emergencyAddress}
            onChange={handleChange}
            className="
            p-4
            rounded-xl
            border
            border-gray-300
            "
          />

        </div>

      </div>

    </div>

  );

}
