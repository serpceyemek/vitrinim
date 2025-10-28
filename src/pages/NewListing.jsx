import React, { useState, useEffect } from "react";
import StepCategory from "../components/StepCategory";
import StepSubCategory from "../components/StepSubCategory";
import StepForm from "../components/StepForm";
import BreadcrumbPath from "../components/BreadcrumbPath";

export default function NewListing() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Sayfadan çıkışta—taslak ve önizleme kalıntılarını temizle
  useEffect(() => {
    return () => {
      localStorage.removeItem("draftListing");
      localStorage.removeItem("previewListing");
    };
  }, []);

  function handleCategorySelect(category) {
    setSelectedCategory(category);
    setStep(2);
  }

  function handleSubCategorySelect(sub) {
    setSelectedSubCategory(sub);
    setStep(3);
  }

  // Geri davranışı (alt kategorisiz akış dahil)
  function handleBack() {
    if (step === 3) {
      if (!selectedSubCategory || selectedSubCategory.slug === null) {
        setStep(1);
        setSelectedSubCategory(null);
        setSelectedCategory(null);
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(1);
      setSelectedCategory(null);
    }
  }

  // Breadcrumb tıklamaları
  function goToRoot() {
    setStep(1);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  }
  function goToCategory() {
    setStep(2);
    setSelectedSubCategory(null);
  }

  return (
    <div className="mx-auto max-w-2xl p-4 sm:p-6">
      {step >= 2 && (
        <BreadcrumbPath
          category={selectedCategory}
          subCategory={selectedSubCategory}
          onRoot={goToRoot}
          onCategory={goToCategory}
        />
      )}

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
