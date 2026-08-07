import React from "react";

import {
  FaCheckCircle,
  FaDownload,
  FaPrint,
  FaEnvelope,
  FaHome,
  FaArrowRight,
  FaFileInvoice,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Step7Success({

  formData,

  applicationNumber = "SPIS-2026-001245",

}) {

  const handlePrint = () => {

    window.print();

  };

  const handleDownloadApplication = () => {

    alert("PDF generation will be connected to the backend.");

  };

  const handleDownloadReceipt = () => {

    alert("Receipt download will be connected later.");

  };

  return (

    <div
      className="
      max-w-5xl
      mx-auto
      py-10
      px-4
      space-y-10
      "
    >

      {/* Success Header */}

      <div
        className="
        bg-green-50
        border
        border-green-200
        rounded-3xl
        shadow-lg
        p-10
        text-center
        "
      >

        <FaCheckCircle
          className="
          mx-auto
          text-green-600
          text-7xl
          animate-bounce
          "
        />

        <h1
          className="
          mt-6
          text-4xl
          font-bold
          text-[#0B3D91]
          "
        >

          Application Submitted Successfully

        </h1>

        <p
          className="
          mt-4
          text-gray-600
          text-lg
          "
        >

          Thank you for choosing Sound Peace International Secondary Schools.

          Your admission application has been received successfully.

        </p>

      </div>

      {/* Application Details */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-gray-100
        p-8
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          text-[#0B3D91]
          mb-6
          "
        >

          Application Summary

        </h2>

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          "
        >

          <p>

            <strong>Application Number:</strong>

            <br />

            {applicationNumber}

          </p>

          <p>

            <strong>Applicant:</strong>

            <br />

            {formData.firstName} {formData.middleName} {formData.lastName}

          </p>

          <p>

            <strong>Email:</strong>

            <br />

            {formData.parentEmail}

          </p>

          <p>

            <strong>Admission Class:</strong>

            <br />

            {formData.admissionClass}

          </p>

          <p>

            <strong>Payment Status:</strong>

            <br />

            <span className="text-green-600 font-bold">

              Paid Successfully

            </span>

          </p>

          <p>

            <strong>Application Status:</strong>

            <br />

            Awaiting Review

          </p>

        </div>

      </div>

      {/* Email Notice */}

      <div
        className="
        rounded-2xl
        bg-blue-50
        border
        border-blue-200
        p-8
        flex
        gap-5
        "
      >

        <FaEnvelope
          className="
          text-[#0B3D91]
          text-4xl
          "
        />

        <div>

          <h3
            className="
            font-bold
            text-xl
            text-[#0B3D91]
            "
          >

            Confirmation Email Sent

          </h3>

          <p className="mt-2 text-gray-600">

            A confirmation email containing your application details,
            payment receipt and application reference number has been
            sent to:

          </p>

          <p
            className="
            mt-2
            font-semibold
            "
          >

            {formData.parentEmail}

          </p>

        </div>

      </div>

      {/* Action Buttons */}

      <div
        className="
        grid
        md:grid-cols-2
        lg:grid-cols-4
        gap-5
        "
      >

        <button
          onClick={handleDownloadApplication}
          className="
          bg-[#FFD700]
          hover:bg-yellow-400
          rounded-xl
          py-4
          font-semibold
          flex
          justify-center
          items-center
          gap-3
          transition
          "
        >

          <FaDownload />

          Application PDF

        </button>

        <button
          onClick={handleDownloadReceipt}
          className="
          bg-white
          border
          border-gray-300
          hover:border-[#0B3D91]
          rounded-xl
          py-4
          font-semibold
          flex
          justify-center
          items-center
          gap-3
          transition
          "
        >

          <FaFileInvoice />

          Receipt

        </button>

        <button
          onClick={handlePrint}
          className="
          bg-white
          border
          border-gray-300
          rounded-xl
          py-4
          font-semibold
          flex
          justify-center
          items-center
          gap-3
          hover:border-[#0B3D91]
          transition
          "
        >

          <FaPrint />

          Print

        </button>

        <button
          className="
          bg-[#0B3D91]
          hover:bg-blue-900
          text-white
          rounded-xl
          py-4
          font-semibold
          flex
          justify-center
          items-center
          gap-3
          transition
          "
        >

          <FaArrowRight />

          Track Application

        </button>

      </div>

      {/* What's Next */}

      <div
        className="
        bg-gray-50
        rounded-3xl
        border
        border-gray-200
        p-8
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          text-[#0B3D91]
          mb-6
          "
        >

          What Happens Next?

        </h2>

        <ol
          className="
          list-decimal
          pl-6
          space-y-4
          text-gray-700
          "
        >

          <li>Your application will be reviewed by our Admissions Office.</li>

          <li>You will receive an email regarding your entrance examination schedule.</li>

          <li>Your submitted documents will be verified.</li>

          <li>Successful applicants will receive an admission offer.</li>

          <li>Follow the admission instructions to complete enrollment.</li>

        </ol>

      </div>

      {/* Contact */}

      <div
        className="
        bg-[#0B3D91]
        rounded-3xl
        text-white
        p-8
        "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-6
          "
        >

          Need Assistance?

        </h2>

        <div className="space-y-4">

          <div className="flex items-center gap-3">

            <FaPhoneAlt />

            +234 XXX XXX XXXX

          </div>

          <div className="flex items-center gap-3">

            <FaEnvelope />

            admissions@soundpeace.edu.ng

          </div>

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt />

            Sound Peace International Secondary Schools,
            Nigeria

          </div>

        </div>

      </div>

      {/* Home Button */}

      <div className="text-center">

        <button
          onClick={() => window.location.href = "/"}
          className="
          inline-flex
          items-center
          gap-3
          bg-[#FFD700]
          hover:bg-yellow-400
          px-10
          py-4
          rounded-xl
          font-bold
          transition
          "
        >

          <FaHome />

          Return to Homepage

        </button>

      </div>

    </div>

  );

}