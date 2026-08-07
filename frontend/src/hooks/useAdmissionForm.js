import { useAdmission } from "../context/AdmissionContext";

export default function useAdmissionForm() {

  const {

    step,
    nextStep,
    previousStep,
    formData,
    updateForm,

  } = useAdmission();

  // ==========================
  // UPDATE SINGLE FIELD
  // ==========================

  const handleChange = (e) => {

    const {

      name,
      value,
      type,
      checked,
      files,

    } = e.target;

    let fieldValue = value;

    if (type === "checkbox") {

      fieldValue = checked;

    }

    if (type === "file") {

      fieldValue = files[0];

    }

    updateForm({

      [name]: fieldValue,

    });

  };

  // ==========================
  // UPDATE MANUALLY
  // ==========================

  const setFieldValue = (field, value) => {

    updateForm({

      [field]: value,

    });

  };

  // ==========================
  // STEP VALIDATION
  // ==========================

  const validateStep = () => {

    switch (step) {

      // STEP 1

      case 1:

        return (

          formData.firstName.trim() !== "" &&

          formData.lastName.trim() !== "" &&

          formData.gender !== "" &&

          formData.dateOfBirth !== "" &&

          formData.admissionClass !== ""

        );

      // STEP 2

      case 2:

        return (

          formData.fatherName.trim() !== "" &&

          formData.phone.trim() !== "" &&

          formData.email.trim() !== ""

        );

      // STEP 3

      case 3:

        return true;

      // STEP 4

      case 4:

        return true;

      // STEP 5

      case 5:

        return true;

      // STEP 6

      case 6:

        return true;

      default:

        return true;

    }

  };

const handleFileChange = (e, field) => {

  const file = e.target.files[0];

  if (!file) return;

  setFormData((prev) => ({

    ...prev,

    [field]: file,

  }));

};

const removeFile = (field) => {

  setFormData((prev) => ({

    ...prev,

    [field]: null,

  }));

};

  // ==========================
  // NEXT BUTTON
  // ==========================

  const handleNext = () => {

    if (validateStep()) {

      nextStep();

      window.scrollTo({

        top: 0,

        behavior: "smooth",

      });

    }

    else {

      alert("Please complete all required fields.");

    }

  };

  // ==========================
  // PREVIOUS BUTTON
  // ==========================

  const handlePrevious = () => {

    previousStep();

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  return {

    step,

    formData,

    setFormData,

    handleChange,

    setFieldValue,

    handleNext,

    handlePrevious,

    validateStep,

    handleFileChange,

    removeFile,
    
    step,

    nextStep,

    previousStep,

  };

}

// const {

//   formData,

//   handleChange,

//   handleNext,

//   handlePrevious,

// } = useAdmissionForm();