import React, { useEffect, useRef, useState } from "react";
import {
  User,
  CalendarDays,
  CircleUserRound,
  MapPin,
  Landmark,
  Flag,
  Heart,
  Cross,
  School,
  Building2,
  HelpCircle,
  Download,
  BriefcaseMedical,
  Users,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useCreateAdmissionMutation } from "../../redux/api/admissionApi";

const INITIAL_FORM_DATA = {
  surname: "",
  firstname: "",
  middlename: "",
  dob: "",
  gender: "",
  hometown: "",
  lga: "",
  state: "",
  religion: "",
  denomination: "",
  school: "",
  schoolAddress: "",
  reason: "",
  allergies: "",
  enrolled: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
};

const INITIAL_DOCUMENTS = {
  testimonial: false,
  results: false,
  emailLater: false,
};

const CLASSES = [
  "Creche",
  "Nursery 1",
  "Nursery 2",
  "Kindergarten",
  "Basic 1",
  "Basic 2",
  "Basic 3",
  "Basic 4",
  "Basic 5",
  "Basic 6",
  "JS 1",
  "JS 2",
  "JS 3",
  "SS 1",
  "SS 2",
  "SS 3",
];

const REQUIRED_FIELDS = [
  "surname",
  "firstname",
  "dob",
  "gender",
  "hometown",
  "lga",
  "state",
  "school",
  "schoolAddress",
  "reason",
  "allergies",
  "enrolled",
  "parentName",
  "parentEmail",
  "parentPhone",
];

const DOCUMENT_LABELS = {
  testimonial: "Testimonial from the school",
  results: "Last three terms' results",
  emailLater: "I will email these documents to the school",
};

export default function AdmissionForm() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  const [createAdmission, { isLoading }] =
    useCreateAdmissionMutation();

  const navigate = useNavigate();
  const firstErrorRef = useRef(null);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [selectedClass, setSelectedClass] = useState("");
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      form: "",
    }));

    setSuccessMessage("");
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);

    setErrors((previous) => ({
      ...previous,
      class: "",
      form: "",
    }));
  };

  const toggleDocument = (name) => {
    setDocuments((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setErrors((previous) => ({
      ...previous,
      documents: "",
      form: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    REQUIRED_FIELDS.forEach((field) => {
      const value = formData[field];

      if (!String(value ?? "").trim()) {
        newErrors[field] = "This field is required.";
      }
    });

const email = formData.parentEmail.trim();

if (
  email &&
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
) {
  newErrors.parentEmail = "Enter a valid email address.";
}

    if (
      formData.dob &&
      new Date(formData.dob) > new Date()
    ) {
      newErrors.dob = "Date of birth cannot be in the future.";
    }

    if (!selectedClass) {
      newErrors.class = "Select the class you are applying for.";
    }

    if (!Object.values(documents).some(Boolean)) {
      newErrors.documents = "Select at least one document option.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setSuccessMessage("");

    if (!validateForm()) {
      requestAnimationFrame(() => {
        firstErrorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });

      return;
    }

    const payload = {
      firstName: formData.firstname.trim(),
      lastName: formData.surname.trim(),
      middleName: formData.middlename.trim(),
      dateOfBirth: formData.dob,
      gender: formData.gender,
      hometown: formData.hometown.trim(),
      lga: formData.lga.trim(),
      stateOfOrigin: formData.state.trim(),
      religion: formData.religion.trim(),
      denomination: formData.denomination.trim(),
      previousSchool: formData.school.trim(),
      previousSchoolAddress: formData.schoolAddress.trim(),
      reasonForLeaving: formData.reason.trim(),
      allergies: formData.allergies.trim(),
      childrenEnrolled: formData.enrolled.trim(),
      classApplyingFor: selectedClass,
      documentOptions: Object.keys(documents).filter(
        (key) => documents[key]
      ),
      parentName: formData.parentName.trim(),
      parentEmail: formData.parentEmail.trim().toLowerCase(),
      parentPhone: formData.parentPhone.trim(),
    };

    try {
      // Send JSON for the initial application form.
      // The form currently has no passport file input, so multipart FormData
      // is unnecessary and can cause validation middleware to see an empty body
      // if Multer is not placed before the validator on the backend.
      console.log("Admission payload being submitted:", payload);

      const response = await createAdmission(payload).unwrap();

      const admissionId =
        response?.data?._id ??
        response?.admission?._id ??
        response?._id ??
        response?.data?.admissionId;

      if (!admissionId) {
        console.error(
          "Admission response did not contain an ID:",
          response
        );

        throw new Error(
          "The server did not return an admission ID. Please check your backend response."
        );
      }

      localStorage.setItem("admissionId", admissionId);

      setSuccessMessage(
        response?.message ||
          "Admission application submitted successfully."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      navigate("/admissions/AcceptAdmission");
    } catch (error) {
      console.error("Admission submission error:", error);
      console.error("HTTP Status:", error?.status);
      console.error("Backend Error Details:", error?.data ?? error?.error);

      const validationMessages = Array.isArray(error?.data?.errors)
        ? error.data.errors.map((item) => item?.message).filter(Boolean)
        : [];

      const errorMessage = validationMessages.length
        ? [...new Set(validationMessages)].join(" ")
        : error?.data?.message ||
          error?.data?.error ||
          error?.error ||
          error?.message ||
          "Admission submission failed. Please check the form and try again.";

      setErrors((previous) => ({
        ...previous,
        form: errorMessage,
      }));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const grid2Style = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : "repeat(2, minmax(0, 1fr))",
    gap: "1.5rem",
  };

  const grid3Style = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : "repeat(3, minmax(0, 1fr))",
    gap: "1.5rem",
  };

  const renderRadioOptions = (name, options) => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        paddingTop: "0.75rem",
        flexWrap: "wrap",
      }}
    >
      {options.map((option) => (
        <label
          key={option}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            color: "#374151",
            padding: "0.5rem 1rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            background:
              formData[name] === option ? "#FFFBEA" : "#fff",
          }}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={formData[name] === option}
            onChange={handleChange}
            style={{
              width: "1rem",
              height: "1rem",
              accentColor: "#0B3D91",
            }}
          />

          {option}
        </label>
      ))}
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "1.5rem 1rem" : "3rem 1.5rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          backgroundColor: "#fff",
          borderRadius: "1.5rem",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
          padding: isMobile ? "1.5rem 1.25rem" : "3rem 2.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1f2937",
            marginBottom: "1rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e5e7eb",
            textAlign: "center",
          }}
        >
          Admission Application
        </h2>

        {errors.form && (
          <div
            ref={firstErrorRef}
            role="alert"
            style={alertStyle}
          >
            {errors.form}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            style={{
              ...alertStyle,
              background: "#f0fdf4",
              color: "#166534",
              borderColor: "#bbf7d0",
            }}
          >
            {successMessage}
          </div>
        )}

        {/* STUDENT NAME */}
        <Section>
          <FormLabel
            icon={<User size={16} />}
            label="Name (Surname first) *"
          />

          <div style={grid3Style}>
            <Field innerRef={errors.surname ? firstErrorRef : null}>
              <input
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                style={getInputStyle(errors.surname)}
                placeholder="Enter surname"
                autoComplete="family-name"
              />

              <HelperText text="Surname" error={errors.surname} />
            </Field>

            <Field innerRef={errors.firstname ? firstErrorRef : null}>
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                style={getInputStyle(errors.firstname)}
                placeholder="Enter first name"
                autoComplete="given-name"
              />

              <HelperText
                text="First Name"
                error={errors.firstname}
              />
            </Field>

            <Field>
              <input
                name="middlename"
                value={formData.middlename}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter middle name"
              />

              <HelperText text="Middle Name (optional)" />
            </Field>
          </div>
        </Section>

        {/* DATE OF BIRTH AND GENDER */}
        <Section>
          <div style={grid2Style}>
            <Field innerRef={errors.dob ? firstErrorRef : null}>
              <FormLabel
                icon={<CalendarDays size={16} />}
                label="Date of Birth *"
              />

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={getInputStyle(errors.dob)}
              />

              {errors.dob && <ErrorText text={errors.dob} />}
            </Field>

            <Field innerRef={errors.gender ? firstErrorRef : null}>
              <FormLabel
                icon={<CircleUserRound size={16} />}
                label="Gender *"
              />

              {renderRadioOptions("gender", ["Female", "Male"])}

              {errors.gender && (
                <ErrorText text={errors.gender} />
              )}
            </Field>
          </div>
        </Section>

        {/* LOCATION */}
        <Section>
          <div style={grid3Style}>
            <Field innerRef={errors.hometown ? firstErrorRef : null}>
              <FormLabel
                icon={<MapPin size={16} />}
                label="Home Town *"
              />

              <input
                name="hometown"
                value={formData.hometown}
                onChange={handleChange}
                style={getInputStyle(errors.hometown)}
                placeholder="e.g. Lagos"
              />

              {errors.hometown && (
                <ErrorText text={errors.hometown} />
              )}
            </Field>

            <Field innerRef={errors.lga ? firstErrorRef : null}>
              <FormLabel
                icon={<Landmark size={16} />}
                label="Local Government Area *"
              />

              <input
                name="lga"
                value={formData.lga}
                onChange={handleChange}
                style={getInputStyle(errors.lga)}
                placeholder="e.g. Ikeja"
              />

              {errors.lga && <ErrorText text={errors.lga} />}
            </Field>

            <Field innerRef={errors.state ? firstErrorRef : null}>
              <FormLabel
                icon={<Flag size={16} />}
                label="State of Origin *"
              />

              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={getInputStyle(errors.state)}
                placeholder="e.g. Lagos State"
              />

              {errors.state && <ErrorText text={errors.state} />}
            </Field>
          </div>
        </Section>

        {/* RELIGION */}
        <Section>
          <div style={grid2Style}>
            <Field>
              <FormLabel
                icon={<Heart size={16} />}
                label="Religion"
              />

              <input
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                style={inputStyle}
                placeholder="e.g. Christianity"
              />
            </Field>

            <Field>
              <FormLabel
                icon={<Cross size={16} />}
                label="Denomination"
              />

              <input
                name="denomination"
                value={formData.denomination}
                onChange={handleChange}
                style={inputStyle}
                placeholder="e.g. Catholic"
              />
            </Field>
          </div>
        </Section>

        {/* PREVIOUS SCHOOL */}
        <Section>
          <div style={grid2Style}>
            <Field innerRef={errors.school ? firstErrorRef : null}>
              <FormLabel
                icon={<School size={16} />}
                label="Present or Last School *"
              />

              <input
                name="school"
                value={formData.school}
                onChange={handleChange}
                style={getInputStyle(errors.school)}
                placeholder="School name"
              />

              {errors.school && (
                <ErrorText text={errors.school} />
              )}
            </Field>

            <Field
              innerRef={
                errors.schoolAddress ? firstErrorRef : null
              }
            >
              <FormLabel
                icon={<Building2 size={16} />}
                label="Address of Present or Last School *"
              />

              <textarea
                name="schoolAddress"
                value={formData.schoolAddress}
                onChange={handleChange}
                rows={4}
                style={getTextareaStyle(errors.schoolAddress)}
                placeholder="Full school address"
              />

              {errors.schoolAddress && (
                <ErrorText text={errors.schoolAddress} />
              )}
            </Field>
          </div>
        </Section>

        {/* CLASS */}
        <Section innerRef={errors.class ? firstErrorRef : null}>
          <FormLabel label="Class for Admission *" />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, minmax(0, 1fr))"
                : "repeat(3, minmax(0, 1fr))",
              gap: "1rem",
              paddingTop: "0.75rem",
            }}
          >
            {CLASSES.map((item) => (
              <label
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  color: "#374151",
                  padding: "0.6rem",
                  border: `1px solid ${
                    selectedClass === item ? "#FFD700" : "#e5e7eb"
                  }`,
                  borderRadius: "0.5rem",
                  background:
                    selectedClass === item ? "#FFFBEA" : "#fff",
                }}
              >
                <input
                  type="radio"
                  name="classApplyingFor"
                  value={item}
                  checked={selectedClass === item}
                  onChange={handleClassChange}
                  style={{
                    width: "1rem",
                    height: "1rem",
                    accentColor: "#0B3D91",
                  }}
                />

                {item}
              </label>
            ))}
          </div>

          {errors.class && <ErrorText text={errors.class} />}

          <HelperText text="Select the single class for which the student is applying." />
        </Section>

        {/* REASON AND DOCUMENTS */}
        <Section>
          <div style={grid2Style}>
            <Field innerRef={errors.reason ? firstErrorRef : null}>
              <FormLabel
                icon={<HelpCircle size={16} />}
                label="Reason for Leaving Current or Last School *"
              />

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                style={getTextareaStyle(errors.reason)}
                placeholder="Briefly explain the reason"
              />

              {errors.reason && (
                <ErrorText text={errors.reason} />
              )}
            </Field>

            <Field
              innerRef={errors.documents ? firstErrorRef : null}
            >
              <FormLabel
                icon={<Download size={16} />}
                label="Testimonial and Exam Results *"
              />

              <div style={{ paddingTop: "0.75rem" }}>
                {Object.keys(documents).map((key) => (
                  <label
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      cursor: "pointer",
                      color: "#374151",
                      marginBottom: "1rem",
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      background: documents[key]
                        ? "#FFFBEA"
                        : "transparent",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={documents[key]}
                      onChange={() => toggleDocument(key)}
                      style={{
                        width: "1rem",
                        height: "1rem",
                        marginTop: "0.25rem",
                        accentColor: "#0B3D91",
                      }}
                    />

                    <span>{DOCUMENT_LABELS[key]}</span>
                  </label>
                ))}
              </div>

              {errors.documents && (
                <ErrorText text={errors.documents} />
              )}

              <HelperText
                text="These options record your document intentions; they do not upload the documents themselves."
              />
            </Field>
          </div>
        </Section>

        {/* HEALTH AND SIBLINGS */}
        <Section>
          <div style={grid2Style}>
            <Field
              innerRef={errors.allergies ? firstErrorRef : null}
            >
              <FormLabel
                icon={<BriefcaseMedical size={16} />}
                label="Any Allergies or Health Condition? *"
              />

              {renderRadioOptions("allergies", ["Yes", "No"])}

              {errors.allergies && (
                <ErrorText text={errors.allergies} />
              )}
            </Field>

            <Field
              innerRef={errors.enrolled ? firstErrorRef : null}
            >
              <FormLabel
                icon={<Users size={16} />}
                label="Children Enrolled in School? *"
              />

              {renderRadioOptions("enrolled", ["Yes", "No"])}

              {errors.enrolled && (
                <ErrorText text={errors.enrolled} />
              )}
            </Field>
          </div>
        </Section>

        {/* PARENT / GUARDIAN */}
        <Section>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#1f2937",
            }}
          >
            Parent / Guardian Information
          </h3>

          <div style={grid3Style}>
            <Field
              innerRef={errors.parentName ? firstErrorRef : null}
            >
              <FormLabel label="Parent / Guardian Name *" />

              <input
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                style={getInputStyle(errors.parentName)}
                placeholder="Full name"
                autoComplete="name"
              />

              {errors.parentName && (
                <ErrorText text={errors.parentName} />
              )}
            </Field>

            <Field
              innerRef={errors.parentEmail ? firstErrorRef : null}
            >
              <FormLabel label="Parent Email Address *" />

              <input
                type="email"
                autoComplete="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                style={getInputStyle(errors.parentEmail)}
                placeholder="example@gmail.com"
              />

              {errors.parentEmail && (
                <ErrorText text={errors.parentEmail} />
              )}
            </Field>

            <Field
              innerRef={errors.parentPhone ? firstErrorRef : null}
            >
              <FormLabel label="Parent Phone Number *" />

              <input
                type="tel"
                autoComplete="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                style={getInputStyle(errors.parentPhone)}
                placeholder="+234..."
              />

              {errors.parentPhone && (
                <ErrorText text={errors.parentPhone} />
              )}
            </Field>
          </div>
        </Section>

        {/* SUBMIT */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...buttonStyle,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(event) => {
              if (isLoading) return;

              event.currentTarget.style.backgroundColor = "#0B3D91";
              event.currentTarget.style.color = "#FFD700";
              event.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.backgroundColor = "#FFD700";
              event.currentTarget.style.color = "#000";
              event.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {isLoading ? "Submitting..." : "Next"}

            {!isLoading && <ArrowRight size={22} />}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ================= STYLES ================= */

const alertStyle = {
  padding: "1rem",
  marginBottom: "1.5rem",
  background: "#fef2f2",
  color: "#b91c1c",
  border: "1px solid #fecaca",
  borderRadius: "0.75rem",
};

const getInputStyle = (hasError) => ({
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "0.5rem",
  border: `2px solid ${hasError ? "#ef4444" : "#e5e7eb"}`,
  padding: "0.875rem 1rem",
  outline: "none",
  transition: "all 0.2s ease",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  backgroundColor: "#fff",
  fontSize: "1rem",
  fontFamily: "inherit",
});

const getTextareaStyle = (hasError) => ({
  ...getInputStyle(hasError),
  resize: "vertical",
  minHeight: "120px",
});

const inputStyle = getInputStyle(false);

const buttonStyle = {
  width: "100%",
  maxWidth: "320px",
  backgroundColor: "#FFD700",
  color: "#000",
  fontWeight: 700,
  padding: "1rem 2.5rem",
  borderRadius: "0.75rem",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
  fontSize: "1.125rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  border: "none",
  transition: "all 0.3s ease",
};

function Section({ children, style = {}, innerRef }) {
  return (
    <div
      ref={innerRef}
      style={{
        marginBottom: "2rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Field({ children, innerRef }) {
  return (
    <div
      ref={innerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        minWidth: 0,
      }}
    >
      {children}
    </div>
  );
}

function FormLabel({ icon, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontWeight: 600,
        color: "#374151",
        fontSize: "0.875rem",
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function HelperText({ text, error }) {
  return (
    <p
      style={{
        fontSize: "0.75rem",
        color: error ? "#ef4444" : "#6b7280",
        marginTop: "0.25rem",
      }}
    >
      {error || text}
    </p>
  );
}

function ErrorText({ text }) {
  return (
    <p
      role="alert"
      style={{
        fontSize: "0.75rem",
        color: "#ef4444",
        fontWeight: 500,
        margin: 0,
      }}
    >
      {text}
    </p>
  );
}