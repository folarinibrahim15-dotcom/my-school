import React from "react";

import {
  FaUserGraduate,
  FaCalendarAlt,
  FaSchool,
  FaMapMarkerAlt,
  FaMosque,
  FaHome,
} from "react-icons/fa";

export default function Step1ChildDetails({

  formData,

  handleChange,

}) {

  const classes = [

    "JSS 1",
    "JSS 2",
    "JSS 3",

    "SSS 1",
    "SSS 2",
    "SSS 3",

  ];

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

          Child Details

        </h2>

        <p
          className="
          mt-2
          text-gray-500
          "
        >

          Please provide accurate information about the applicant.

        </p>

      </div>

      {/* ==========================
            NAME
      ========================== */}

      <div>

        <label className="font-semibold text-gray-700">

          Full Name *

        </label>

        <div
          className="
          mt-3
          grid
          md:grid-cols-3
          gap-4
          "
        >

          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            className="
            rounded-xl
            border
            border-gray-300
            p-4
            focus:ring-2
            focus:ring-[#0B3D91]
            outline-none
            "
          />

          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            className="
            rounded-xl
            border
            border-gray-300
            p-4
            focus:ring-2
            focus:ring-[#0B3D91]
            outline-none
            "
          />

          <input
            type="text"
            name="middlename"
            placeholder="Middle Name"
            value={formData.middlename}
            onChange={handleChange}
            className="
            rounded-xl
            border
            border-gray-300
            p-4
            focus:ring-2
            focus:ring-[#0B3D91]
            outline-none
            "
          />

        </div>

      </div>

      {/* ==========================
            GRID
      ========================== */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        {/* DOB */}

        <div>

          <label className="font-semibold">

            Date of Birth *

          </label>

          <div className="relative mt-2">

            <FaCalendarAlt
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              "
            />

            <input
              type="date"
              name="dob"
              value={formData.dob}
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

        {/* Gender */}

        <div>

          <label className="font-semibold">

            Gender *

          </label>

          <div
            className="
            flex
            gap-8
            mt-5
            "
          >

            <label className="flex items-center gap-2">

              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />

              Male

            </label>

            <label className="flex items-center gap-2">

              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />

              Female

            </label>

          </div>

        </div>

        {/* Hometown */}

        <div>

          <label className="font-semibold">

            Home Town

          </label>

          <div className="relative mt-2">

            <FaHome
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
              name="hometown"
              value={formData.hometown}
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

        {/* State */}

        <div>

          <label className="font-semibold">

            State

          </label>

          <div className="relative mt-2">

            <FaMapMarkerAlt
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
              name="state"
              value={formData.state}
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

        {/* Religion */}

        <div>

          <label className="font-semibold">

            Religion

          </label>

          <div className="relative mt-2">

            <FaMosque
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
              name="religion"
              value={formData.religion}
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

        {/* Present School */}

        <div>

          <label className="font-semibold">

            Present School

          </label>

          <div className="relative mt-2">

            <FaSchool
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
              name="presentSchool"
              value={formData.presentSchool}
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

      </div>

      {/* Address */}

      <div>

        <label className="font-semibold">

          School Address

        </label>

        <textarea
          rows="4"
          name="schoolAddress"
          value={formData.schoolAddress}
          onChange={handleChange}
          className="
          mt-3
          w-full
          rounded-xl
          border
          border-gray-300
          p-4
          resize-none
          focus:ring-2
          focus:ring-[#0B3D91]
          outline-none
          "
        />

      </div>

      {/* Class */}

      <div>

        <label className="font-semibold">

          Class Applying For *

        </label>

        <div
          className="
          mt-4
          grid
          grid-cols-2
          md:grid-cols-3
          gap-4
          "
        >

          {

            classes.map((item) => (

              <label
                key={item}
                className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-gray-200
                p-4
                cursor-pointer
                hover:border-[#FFD700]
                hover:bg-yellow-50
                transition
                "
              >

                <input
                  type="radio"
                  name="admissionClass"
                  value={item}
                  checked={
                    formData.admissionClass === item
                  }
                  onChange={handleChange}
                />

                {item}

              </label>

            ))

          }

        </div>

      </div>

    </div>

  );

}