import React, { useRef } from "react";

import {
  FaCloudUploadAlt,
  FaCheckCircle,
  FaFilePdf,
  FaFileImage,
  FaTrash,
} from "react-icons/fa";

export default function Step4Documents({

  formData,

  handleFileChange,

  removeFile,

}) {

  const passportRef = useRef(null);
  const birthRef = useRef(null);
  const testimonialRef = useRef(null);
  const resultRef = useRef(null);
  const otherRef = useRef(null);

  const uploads = [

    {
      label: "Passport Photograph *",
      name: "passport",
      ref: passportRef,
    },

    {
      label: "Birth Certificate *",
      name: "birthCertificate",
      ref: birthRef,
    },

    {
      label: "Previous School Testimonial",
      name: "testimonial",
      ref: testimonialRef,
    },

    {
      label: "Last School Result",
      name: "lastResult",
      ref: resultRef,
    },

    {
      label: "Other Supporting Documents",
      name: "otherDocuments",
      ref: otherRef,
    },

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
      space-y-8
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

          Required Documents

        </h2>

        <p
          className="
          mt-2
          text-gray-500
          "
        >

          Upload all required documents before proceeding to the next step.

        </p>

      </div>

      {/* Upload Cards */}

      <div className="space-y-6">

        {

          uploads.map((item) => {

            const file = formData[item.name];

            return (

              <div
                key={item.name}
                className="
                border-2
                border-dashed
                border-gray-300
                rounded-2xl
                p-6
                hover:border-[#FFD700]
                hover:bg-yellow-50
                transition-all
                duration-300
                "
              >

                <input
                  ref={item.ref}
                  type="file"
                  hidden
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      item.name
                    )
                  }
                />

                {

                  !file ? (

                    <button
                      type="button"
                      onClick={() =>
                        item.ref.current.click()
                      }
                      className="
                      w-full
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-4
                      py-8
                      "
                    >

                      <FaCloudUploadAlt
                        size={55}
                        className="text-[#0B3D91]"
                      />

                      <h3
                        className="
                        text-lg
                        font-semibold
                        "
                      >

                        {item.label}

                      </h3>

                      <p
                        className="
                        text-gray-500
                        text-center
                        "
                      >

                        Click to upload or drag & drop

                      </p>

                      <span
                        className="
                        text-xs
                        text-gray-400
                        "
                      >

                        JPG • PNG • PDF
                        (Maximum 5MB)

                      </span>

                    </button>

                  ) : (

                    <div
                      className="
                      flex
                      items-center
                      justify-between
                      "
                    >

                      <div
                        className="
                        flex
                        items-center
                        gap-4
                        "
                      >

                        {

                          file.type.includes("pdf")

                          ?

                          <FaFilePdf
                            size={45}
                            className="text-red-600"
                          />

                          :

                          <FaFileImage
                            size={45}
                            className="text-blue-600"
                          />

                        }

                        <div>

                          <h4
                            className="
                            font-semibold
                            "
                          >

                            {file.name}

                          </h4>

                          <p
                            className="
                            text-sm
                            text-gray-500
                            "
                          >

                            {(file.size / 1024 / 1024).toFixed(2)} MB

                          </p>

                        </div>

                      </div>

                      <div
                        className="
                        flex
                        items-center
                        gap-5
                        "
                      >

                        <FaCheckCircle
                          size={28}
                          className="text-green-600"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeFile(item.name)
                          }
                          className="
                          text-red-500
                          hover:text-red-700
                          transition
                          "
                        >

                          <FaTrash size={22} />

                        </button>

                      </div>

                    </div>

                  )

                }

              </div>

            );

          })

        }

      </div>

      {/* Notice */}

      <div
        className="
        rounded-2xl
        bg-blue-50
        border
        border-blue-200
        p-6
        "
      >

        <h3
          className="
          font-bold
          text-[#0B3D91]
          mb-3
          "
        >

          Upload Guidelines

        </h3>

        <ul
          className="
          list-disc
          pl-6
          space-y-2
          text-gray-600
          "
        >

          <li>Passport photograph should have a plain white background.</li>

          <li>Birth certificate must be clear and readable.</li>

          <li>Accepted file formats: JPG, JPEG, PNG and PDF.</li>

          <li>Maximum upload size per file: 5 MB.</li>

          <li>Ensure every uploaded document belongs to the applicant.</li>

        </ul>

      </div>

    </div>

  );

}