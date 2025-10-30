import React, { useState, useEffect } from "react";
import StepCategory from "../components/StepCategory";
import StepSubCategory from "../components/StepSubCategory";
import StepForm from "../components/StepForm";
import BreadcrumbPath from "../components/BreadcrumbPath";

export default function NewListing() {
  // 🔹 Adım kontrolü (1=Kategori, 2=Alt kategori, 3=Form)
  const [step, setStep] = useState(1);

  // 🔹 Seçilen kategori ve alt kategori
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // 🌳 Hayat Ağacı: Arama sayfasında seçilen kategori başlığı
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("");

  // 🧹 Sayfaya girildiğinde ve çıkıldığında taslak + önizleme kalıntılarını temizle
  useEffect(() => {
    localStorage.removeItem("draftListing");
    localStorage.removeItem("previewListing");

    return () => {
      localStorage.removeItem("draftListing");
      localStorage.removeItem("previewListing");
    };
  }, []);

  // 🌳 Hayat Ağacı: seçilen kategori başlığını localStorage'dan oku
  useEffect(() => {
    const savedTitle = localStorage.getItem("selectedCategoryTitle");
    if (savedTitle) setSelectedCategoryTitle(savedTitle);
  }, []);

  // 🔹 Geri veya ileri adım butonları (isteğe göre değişebilir)
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // 🔹 Görüntülenecek adım bileşeni
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepCategory
            onSelect={(cat) => {
              setSelectedCategory(cat);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <StepSubCategory
            category={selectedCategory}
            onSelect={(sub) => {
              setSelectedSubCategory(sub);
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepForm
            category={selectedCategory}
            subCategory={selectedSubCategory}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  // 🔹 JSX (görünüm)
  return (
    <div className="min-h-[calc(100vh-88px)] bg-white p-4">
      {/* 🌳 Eğer Hayat Ağacı'ndan kategori seçildiyse göster */}
      {selectedCategoryTitle && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg mb-4 shadow-sm border border-green-100">
          Seçili kategori: <strong>{selectedCategoryTitle}</strong>
        </div>
      )}

      {/* Üstte breadcrumb varsa */}
      <BreadcrumbPath step={step} />

      {/* Aktif adım */}
      <div className="mt-4">{renderStep()}</div>
    </div>
  );
}
