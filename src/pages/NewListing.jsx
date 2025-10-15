import React from "react";
import { useNavigate } from "react-router-dom";
import "./listing.css";

export default function NewListing() {
  const navigate = useNavigate();

  const categories = [
    "Emlak",
    "Vasıta",
    "Yedek Parça, Aksesuar, Donanım & Tuning",
    "İkinci El ve Sıfır Alışveriş",
    "İş Makineleri & Sanayi",
    "Özel Ders Verenler",
    "İş İlanları",
    "Hayvanlar Alemi",
    "Yardımcı Arayanlar",
  ];

  return (
    <div className="listing-page">
      <h2>İlan Ver</h2>
      <p>Adım adım kategori seçimi yapın:</p>

      <ul>
        {categories.map((cat, i) => (
          <li key={i} onClick={() => navigate(`/ilan-ver/${cat.toLowerCase()}`)}>
            {cat} <span>›</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
