// src/pages/NewListing.jsx
import React, { useState } from "react";
import StepCategory from "../components/StepCategory";
import StepSubCategory from "../components/StepSubCategory";
import StepForm from "../components/StepForm";

export default function NewListing() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  function handleCategorySelect(category) {
    setSelectedCategory(category);
    setStep(2);
  }

  function handleSubCategorySelect(sub) {
    setSelectedSubCategory(sub);
    setStep(3);
  }

  function handleBack() {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  }

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6">
      {step === 1 && <StepCategory onSelect={handleCategorySelect} />}
      {step === 2 && (
        <StepSubCategory
          category={selectedCategory}
          onBack={handleBack}
          onSelect={handleSubCategorySelect}
        />
      )}
      {step === 3 && (
        <StepForm
          category={selectedCategory}
          subCategory={selectedSubCategory}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
