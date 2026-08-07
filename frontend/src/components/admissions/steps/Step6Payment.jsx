import React, { useState } from "react";

import {
  FaLock,
  FaUniversity,
  FaCreditCard,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

export default function Step6Paystack({

  formData,

}) {

  const [loading, setLoading] = useState(false);

  const amount = 15000;

  const serviceCharge = 0;

  const total = amount + serviceCharge;

  const handlePayment = async () => {

    setLoading(true);

    /*
      Replace this section later with your backend call.

      Example:

      const response = await axios.post(
        "/api/payment/initialize",
        {
          email: formData.parentEmail,
          amount: total,
        }
      );

      window.location.href =
      response.data.authorization_url;
    */

    setTimeout(() => {

      alert("Redirecting to Paystack...");

      setLoading(false);

    }, 2000);

  };

  return (

    <div
      className="
      max-w-4xl
      mx-auto
      space-y-8
      "
    >

      {/* Heading */}

      <div className="text-center">

        <h2
          className="
          text-4xl
          font-bold
          text-[#0B3D91]
          "
        >

          Secure Payment

        </h2>

        <p
          className="
          mt-3
          text-gray-500
          "
        >

          Complete your admission application by paying the application fee securely.

        </p>

      </div>

      {/* Security Banner */}

      <div
        className="
        bg-green-50
        border
        border-green-200
        rounded-2xl
        p-6
        flex
        items-center
        gap-4
        "
      >

        <FaShieldAlt
          className="
          text-green-600
          text-4xl
          "
        />

        <div>

          <h3
            className="
            text-xl
            font-bold
            text-green-700
            "
          >

            Secure SSL Encrypted Payment

          </h3>

          <p className="text-gray-600">

            Your payment is processed securely through Paystack using industry-standard encryption.

          </p>

        </div>

      </div>

      {/* Payment Card */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-gray-100
        overflow-hidden
        "
      >

        {/* Header */}

        <div
          className="
          bg-[#0B3D91]
          text-white
          px-8
          py-6
          "
        >

          <div
            className="
            flex
            items-center
            gap-4
            "
          >

            <FaUniversity className="text-3xl" />

            <div>

              <h3
                className="
                text-2xl
                font-bold
                "
              >

                Sound Peace International Secondary Schools

              </h3>

              <p className="text-blue-100">

                Admission Application Payment

              </p>

            </div>

          </div>

        </div>

        {/* Applicant */}

        <div className="p-8 space-y-8">

          <div>

            <h4
              className="
              text-lg
              font-semibold
              mb-4
              "
            >

              Applicant

            </h4>

            <div
              className="
              grid
              md:grid-cols-2
              gap-5
              "
            >

              <p>

                <strong>Name:</strong>

                {" "}

                {formData.firstName}

                {" "}

                {formData.lastName}

              </p>

              <p>

                <strong>Email:</strong>

                {" "}

                {formData.parentEmail}

              </p>

              <p>

                <strong>Admission Class:</strong>

                {" "}

                {formData.admissionClass}

              </p>

              <p>

                <strong>Phone:</strong>

                {" "}

                {formData.parentPhone}

              </p>

            </div>

          </div>

          {/* Fee Breakdown */}

          <div
            className="
            rounded-2xl
            bg-gray-50
            p-6
            "
          >

            <h4
              className="
              font-bold
              text-lg
              mb-5
              "
            >

              Payment Summary

            </h4>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>

                  Admission Form

                </span>

                <strong>

                  ₦15,000

                </strong>

              </div>

              <div className="flex justify-between">

                <span>

                  Processing Fee

                </span>

                <strong>

                  ₦0

                </strong>

              </div>

              <hr />

              <div
                className="
                flex
                justify-between
                text-xl
                font-bold
                text-[#0B3D91]
                "
              >

                <span>

                  Total

                </span>

                <span>

                  ₦{total.toLocaleString()}

                </span>

              </div>

            </div>

          </div>

          {/* Paystack Button */}

          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="
            w-full
            bg-[#FFD700]
            hover:bg-yellow-400
            rounded-xl
            py-5
            font-bold
            text-lg
            flex
            justify-center
            items-center
            gap-4
            transition
            disabled:opacity-60
            "
          >

            {

              loading

              ?

              "Redirecting..."

              :

              <>

                <FaCreditCard />

                Pay ₦15,000 with Paystack

                <FaArrowRight />

              </>

            }

          </button>

          {/* Security Notice */}

          <div
            className="
            flex
            items-center
            justify-center
            gap-3
            text-gray-500
            "
          >

            <FaLock />

            <span>

              Your payment information is encrypted and secure.

            </span>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div
        className="
        bg-blue-50
        border
        border-blue-200
        rounded-2xl
        p-6
        flex
        gap-4
        "
      >

        <FaCheckCircle
          className="
          text-[#0B3D91]
          text-3xl
          "
        />

        <div>

          <h4
            className="
            font-bold
            text-[#0B3D91]
            "
          >

            After Successful Payment

          </h4>

          <p className="text-gray-600 mt-2">

            Your admission application will be submitted automatically. A confirmation email together with your application reference number and payment receipt will be sent to your registered email address.

          </p>

        </div>

      </div>

    </div>

  );

}