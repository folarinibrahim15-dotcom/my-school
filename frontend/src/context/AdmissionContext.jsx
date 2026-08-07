import React, {
  createContext,
  useContext,
  useState,
} from "react";

const AdmissionContext = createContext();

export function AdmissionProvider({ children }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({

    // ==========================
    // CHILD DETAILS
    // ==========================

    passport: null,

    firstName: "",

    middleName: "",

    lastName: "",

    dateOfBirth: "",

    gender: "",

    nationality: "",

    state: "",

    lga: "",

    religion: "",

    denomination: "",

    presentSchool: "",

    presentClass: "",

    admissionClass: "",

    reasonForLeaving: "",

    // ==========================
    // PARENT DETAILS
    // ==========================

    fatherName: "",

    motherName: "",

    guardianName: "",

    relationship: "",

    occupation: "",

    email: "",

    phone: "",

    whatsapp: "",

    homeAddress: "",

    officeAddress: "",

    emergencyContact: "",

    // ==========================
    // MEDICAL
    // ==========================

    bloodGroup: "",

    genotype: "",

    allergies: "",

    medications: "",

    disability: "",

    doctor: "",

    hospital: "",

    medicalNotes: "",

    // ==========================
    // DOCUMENTS
    // ==========================

    birthCertificate: null,

    testimonial: null,

    previousResult: null,

    localGovernmentCertificate: null,

    parentID: null,

  });

  const nextStep = () => {

    if (step < 7) {

      setStep(step + 1);

    }

  };

  const previousStep = () => {

    if (step > 1) {

      setStep(step - 1);

    }

  };

  const updateForm = (data) => {

    setFormData((prev) => ({

      ...prev,

      ...data,

    }));

  };

  return (

    <AdmissionContext.Provider

      value={{

        step,

        setStep,

        nextStep,

        previousStep,

        formData,

        updateForm,

      }}

    >

      {children}

    </AdmissionContext.Provider>

  );

}

export function useAdmission() {

  return useContext(AdmissionContext);

}