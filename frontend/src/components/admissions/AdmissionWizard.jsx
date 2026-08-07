import React from "react";

import { useAdmission } from "../../context/AdmissionContext";

import useAdmissionForm from "../../hooks/useAdmissionForm";

import AdmissionProgress from "./AdmissionProgress";
import WizardButtons from "./WizardButtons";

import Step1ChildDetails from "./steps/Step1ChildDetails";
import Step2ParentDetails from "./steps/Step2ParentDetails";
import Step3Medical from "./steps/Step3Medical";
import Step4Documents from "./steps/Step4Documents";
import Step5Review from "./steps/Step5Review";
import Step6Payment from "./steps/Step6Payment";
import Step7Success from "./steps/Step7Success";

export default function AdmissionWizard() {

  const { step } = useAdmission();

  const {

    handleNext,

    handlePrevious,

  } = useAdmissionForm();

  // ==========================
  // RENDER CURRENT STEP
  // ==========================

  const renderStep = () => {

    switch (step) {

      case 1:

        return <Step1ChildDetails />;

      case 2:

        return <Step2ParentDetails />;

      case 3:

        return <Step3Medical />;

      case 4:

        return <Step4Documents />;

      case 5:

        return <Step5Review />;

      case 6:

        return <Step6Payment />;

      case 7:

        return <Step7Success />;

      default:

        return <Step1ChildDetails />;

    }

  };

  // ==========================
  // PROGRESS %
  // ==========================

  const progress = Math.round((step / 7) * 100);

  return (

    <div
      className="
      w-full
      bg-white
      rounded-3xl
      shadow-xl
      border
      border-gray-100
      overflow-hidden
      "
    >

      {/* Progress */}

      <AdmissionProgress

        step={step}

        progress={progress}

      />



      {/* Current Step */}

      <div
        className="
        p-6
        md:p-10
        "
      >

        {renderStep()}

      </div>



      {/* Navigation */}

      {

        step < 7 && (

          <WizardButtons

            step={step}

            onPrevious={handlePrevious}

            onNext={handleNext}

          />

        )

      }

    </div>

  );

}