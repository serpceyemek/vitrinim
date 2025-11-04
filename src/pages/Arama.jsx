// src/pages/Arama.jsx
import React from "react";
import { Search, Mic, ChevronRight } from "lucide-react";
import { MAIN_CATEGORIES } from "../data/mainCategories";
import BottomTabs from "../components/BottomTabs";

export default function Arama() {
  const anaKategoriler = MAIN_CATEGORIES;

  return (
    <div
      style={{
        padding: "20px 16px 90px", // Üst ve alt boşluklar
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* Arama Kutusu */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f9fafb",
          border: "1px solid #eee",
          borderRadius: "8px",
          padding: "10px 12px",
          marginBottom: "20px",
        }}
      >
        <Search size={20} color="#9ca3af" />
        <input
          type="text"
          placeholder="Kategori veya ilan adı ile ara..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            paddingLeft: "8px",
            fontSize: "15px",
          }}
        />
        <Mic size={20} color="#9ca3af" />
      </div>

      {/* Ana Kategoriler Başlığı */}
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "12px",
          color: "#111827",
        }}
      >
        Ana Kategoriler
      </h2>

      {/* Ana Kategori Listesi */}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {anaKategoriler.map((kategori, index) => (
          <li
            key={kategori.slug || index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "14px 12px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#111827",
                }}
              >
                {kategori.name}
              </span>
            </div>
            <ChevronRight size={18} color="#9ca3af" />
          </li>
        ))}
      </ul>

      {/* Alt Turuncu Navigasyon Bar */}
      <BottomTabs />
    </div>
  );
}
