import React from "react";

import {
  FaUserGraduate,
  FaUserTie,
  FaHeartbeat,
  FaFolderOpen,
  FaCheckCircle,
  FaEdit,
} from "react-icons/fa";

export default function Step5Review({

  formData,

  agreed,

  setAgreed,

  goToStep,

}) {

  const ReviewSection = ({
    icon,
    title,
    step,
    children,
  }) => (

    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      border
      border-gray-100
      overflow-hidden
      "
    >

      <div
        className="
        flex
        items-center
        justify-between
        bg-[#0B3D91]
        text-white
        px-6
        py-4
        "
      >

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          {icon}

          <h3
            className="
            text-lg
            font-semibold
            "
          >

            {title}

          </h3>

        </div>

        <button
          type="button"
          onClick={() => goToStep(step)}
          className="
          flex
          items-center
          gap-2
          bg-white/20
          px-4
          py-2
          rounded-lg
          hover:bg-white/30
          transition
          "
        >

          <FaEdit />

          Edit

        </button>

      </div>

      <div
        className="
        p-6
        space-y-3
        "
      >

        {children}

      </div>

    </div>

  );

  return (

    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h2
          className="
          text-3xl
          font-bold
          text-[#0B3D91]
          "
        >

          Review Your Application

        </h2>

        <p className="text-gray-500 mt-2">

          Please review all information carefully before proceeding to payment.

        </p>

      </div>

      {/* Child Details */}

      <ReviewSection
        title="Child Details"
        icon={<FaUserGraduate />}
        step={1}
      >

        <p><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</p>

        <p><strong>Date of Birth:</strong> {formData.dob}</p>

        <p><strong>Gender:</strong> {formData.gender}</p>

        <p><strong>State:</strong> {formData.state}</p>

        <p><strong>Present School:</strong> {formData.presentSchool}</p>

        <p><strong>Admission Class:</strong> {formData.admissionClass}</p>

      </ReviewSection>

      {/* Parent */}

      <ReviewSection
        title="Parent / Guardian"
        icon={<FaUserTie />}
        step={2}
      >

        <p><strong>Father:</strong> {formData.fatherName}</p>

        <p><strong>Mother:</strong> {formData.motherName}</p>

        <p><strong>Phone:</strong> {formData.parentPhone}</p>

        <p><strong>Email:</strong> {formData.parentEmail}</p>

        <p><strong>Address:</strong> {formData.parentAddress}</p>

      </ReviewSection>

      {/* Medical */}

      <ReviewSection
        title="Medical Information"
        icon={<FaHeartbeat />}
        step={3}
      >

        <p><strong>Blood Group:</strong> {formData.bloodGroup}</p>

        <p><strong>Genotype:</strong> {formData.genotype}</p>

        <p><strong>Allergies:</strong> {formData.allergies}</p>

        {formData.allergyDetails && (
          <p><strong>Allergy Details:</strong> {formData.allergyDetails}</p>
        )}

        <p><strong>Medical Conditions:</strong> {formData.medicalConditions}</p>

      </ReviewSection>

      {/* Documents */}

      <ReviewSection
        title="Uploaded Documents"
        icon={<FaFolderOpen />}
        step={4}
      >

        <p>Passport: {formData.passport?.name || "Not Uploaded"}</p>

        <p>Birth Certificate: {formData.birthCertificate?.name || "Not Uploaded"}</p>

        <p>Testimonial: {formData.testimonial?.name || "Not Uploaded"}</p>

        <p>Last Result: {formData.lastResult?.name || "Not Uploaded"}</p>

        <p>Other Documents: {formData.otherDocuments?.name || "None"}</p>

      </ReviewSection>

      {/* Declaration */}

      <div
        className="
        bg-yellow-50
        border
        border-yellow-300
        rounded-2xl
        p-6
        "
      >

        <div className="flex items-start gap-4">

          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) =>
              setAgreed(e.target.checked)
            }
            className="mt-1"
          />

          <div>

            <h3
              className="
              text-lg
              font-bold
              "
            >

              Declaration

            </h3>

            <p className="text-gray-700 mt-2">

              I certify that all information supplied in this application is true, accurate, and complete. I understand that providing false information may result in the cancellation of this application.

            </p>

          </div>

        </div>

      </div>

      {/* Ready for Payment */}

      <div
        className="
        rounded-2xl
        bg-green-50
        border
        border-green-200
        p-6
        flex
        items-center
        gap-4
        "
      >

        <FaCheckCircle
          className="
          text-green-600
          text-3xl
          "
        />

        <div>

          <h3
            className="
            font-bold
            text-green-700
            "
          >

            Ready for Payment

          </h3>

          <p className="text-gray-600">

            Once you click <strong>Next</strong>, you will be redirected to the secure Paystack payment page to pay the ₦15,000 admission application fee.

          </p>

        </div>

      </div>

    </div>

  );

}