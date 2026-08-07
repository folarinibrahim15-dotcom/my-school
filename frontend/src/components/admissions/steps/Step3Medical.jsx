import React from "react";

import {
  FaHeartbeat,
  FaNotesMedical,
  FaTint,
  FaClinicMedical,
  FaUserMd,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Step3Medical({

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

          Medical & Emergency Information

        </h2>

        <p
          className="
          mt-2
          text-gray-500
          "
        >

          This information helps us provide a safe and supportive environment for your child.

        </p>

      </div>

      {/* Blood Group & Genotype */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <div>

          <label className="font-semibold">

            Blood Group

          </label>

          <div className="relative mt-2">

            <FaTint
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-red-500
              "
            />

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
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
            >

              <option value="">Select Blood Group</option>

              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>

            </select>

          </div>

        </div>

        <div>

          <label className="font-semibold">

            Genotype

          </label>

          <select
            name="genotype"
            value={formData.genotype}
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
          >

            <option value="">Select Genotype</option>

            <option>AA</option>
            <option>AS</option>
            <option>SS</option>
            <option>AC</option>
            <option>SC</option>

          </select>

        </div>

      </div>

      {/* Allergies */}

      <div>

        <label className="font-semibold">

          Does the child have any allergies?

        </label>

        <div className="flex gap-8 mt-4">

          <label className="flex items-center gap-2">

            <input
              type="radio"
              name="allergies"
              value="Yes"
              checked={formData.allergies === "Yes"}
              onChange={handleChange}
            />

            Yes

          </label>

          <label className="flex items-center gap-2">

            <input
              type="radio"
              name="allergies"
              value="No"
              checked={formData.allergies === "No"}
              onChange={handleChange}
            />

            No

          </label>

        </div>

        {formData.allergies === "Yes" && (

          <textarea
            rows="3"
            name="allergyDetails"
            value={formData.allergyDetails}
            onChange={handleChange}
            placeholder="Describe the allergies..."
            className="
            mt-4
            w-full
            p-4
            rounded-xl
            border
            border-gray-300
            resize-none
            "
          />

        )}

      </div>

      {/* Medical Conditions */}

      <div>

        <label className="font-semibold">

          Existing Medical Condition(s)

        </label>

        <div className="relative mt-2">

          <FaNotesMedical
            className="
            absolute
            left-4
            top-5
            text-gray-400
            "
          />

          <textarea
            rows="4"
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            placeholder="Asthma, epilepsy, diabetes, etc."
            className="
            w-full
            pl-12
            p-4
            rounded-xl
            border
            border-gray-300
            resize-none
            "
          />

        </div>

      </div>

      {/* Medication */}

      <div>

        <label className="font-semibold">

          Current Medication

        </label>

        <textarea
          rows="3"
          name="medication"
          value={formData.medication}
          onChange={handleChange}
          placeholder="List any medications the child is currently taking..."
          className="
          mt-2
          w-full
          p-4
          rounded-xl
          border
          border-gray-300
          resize-none
          "
        />

      </div>

      {/* Disability */}

      <div>

        <label className="font-semibold">

          Physical Disability or Special Educational Need?

        </label>

        <textarea
          rows="3"
          name="specialNeeds"
          value={formData.specialNeeds}
          onChange={handleChange}
          placeholder="If applicable, please provide details..."
          className="
          mt-2
          w-full
          p-4
          rounded-xl
          border
          border-gray-300
          resize-none
          "
        />

      </div>

      {/* Doctor Information */}

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
          flex
          items-center
          gap-3
          text-xl
          font-bold
          text-[#0B3D91]
          "
        >

          <FaUserMd />

          Family Doctor / Hospital

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
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            placeholder="Doctor's Name"
            className="
            p-4
            rounded-xl
            border
            border-gray-300
            "
          />

          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            placeholder="Hospital / Clinic"
            className="
            p-4
            rounded-xl
            border
            border-gray-300
            "
          />

          <input
            type="tel"
            name="doctorPhone"
            value={formData.doctorPhone}
            onChange={handleChange}
            placeholder="Hospital Phone Number"
            className="
            p-4
            rounded-xl
            border
            border-gray-300
            "
          />

          <input
            type="text"
            name="hospitalAddress"
            value={formData.hospitalAddress}
            onChange={handleChange}
            placeholder="Hospital Address"
            className="
            p-4
            rounded-xl
            border
            border-gray-300
            "
          />

        </div>

      </div>

      {/* Emergency Consent */}

      <div
        className="
        bg-yellow-50
        border
        border-yellow-300
        rounded-2xl
        p-6
        "
      >

        <h3
          className="
          text-lg
          font-bold
          text-[#0B3D91]
          mb-4
          flex
          items-center
          gap-3
          "
        >

          <FaHeartbeat />

          Emergency Medical Consent

        </h3>

        <p className="text-gray-700 mb-5">

          I authorize Sound Peace International Secondary Schools to obtain emergency medical treatment for my child if I cannot be reached immediately.

        </p>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            name="medicalConsent"
            checked={formData.medicalConsent}
            onChange={handleChange}
          />

          I Agree

        </label>

      </div>

    </div>

  );

}
